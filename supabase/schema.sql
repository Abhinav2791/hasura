-- ============================================================================
-- HASURA DIGITAL PLATFORM — SUPABASE POSTGRESQL SCHEMA & SECURITY RULES
-- Brand: HASURA | Tagline: DREAM • BUILD • GROW
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PROFILES TABLE (Linked with Supabase Auth auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ============================================================================
-- 2. COURSES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY, -- slug or unique string id
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    short_description TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('AI', 'Cloud', 'DevOps', 'Development', 'Design')),
    level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced', 'Beginner to Intermediate')),
    duration TEXT NOT NULL,
    price NUMERIC(10, 2) DEFAULT 0.00,
    thumbnail_url TEXT,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    projects_count INT NOT NULL DEFAULT 0,
    career_support TEXT[] NOT NULL DEFAULT '{}',
    curriculum JSONB NOT NULL DEFAULT '[]',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_active ON public.courses(is_active);

-- ============================================================================
-- 3. COURSE ENROLLMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in_progress', 'completed')),
    progress INT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    certificate_id TEXT UNIQUE,
    UNIQUE(user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.course_enrollments(course_id);

-- ============================================================================
-- 4. PROJECTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    industry TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    github_url TEXT,
    live_url TEXT,
    architecture_overview TEXT,
    problem_statement TEXT,
    solution_statement TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);

-- ============================================================================
-- 5. CONTACT SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON public.contact_submissions(created_at DESC);

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------------------------------
-- PROFILES POLICIES
-- ----------------------------------------------------------------------------
-- Public can read limited profile info, user can read/update their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admin full access on profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- COURSES POLICIES
-- ----------------------------------------------------------------------------
-- Anyone can read active courses
CREATE POLICY "Public can view active courses"
    ON public.courses FOR SELECT
    USING (is_active = true OR public.is_admin());

-- Admins can insert/update/delete courses
CREATE POLICY "Admins manage courses"
    ON public.courses FOR ALL
    USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- COURSE ENROLLMENTS POLICIES
-- ----------------------------------------------------------------------------
-- Students can only view and update their own enrollments
CREATE POLICY "Users view own enrollments"
    ON public.course_enrollments FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users enroll themselves"
    ON public.course_enrollments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own enrollment progress"
    ON public.course_enrollments FOR UPDATE
    USING (auth.uid() = user_id OR public.is_admin());

-- ----------------------------------------------------------------------------
-- PROJECTS POLICIES
-- ----------------------------------------------------------------------------
-- Public can view projects
CREATE POLICY "Public can view projects"
    ON public.projects FOR SELECT
    USING (true);

CREATE POLICY "Admins manage projects"
    ON public.projects FOR ALL
    USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- CONTACT SUBMISSIONS POLICIES
-- ----------------------------------------------------------------------------
-- Any visitor can submit a contact inquiry (insert only)
CREATE POLICY "Public can submit contact form"
    ON public.contact_submissions FOR INSERT
    WITH CHECK (true);

-- Only Admins can view and update contact inquiries
CREATE POLICY "Admins view and manage contact submissions"
    ON public.contact_submissions FOR ALL
    USING (public.is_admin());

-- ============================================================================
-- 7. SUPABASE STORAGE BUCKETS CONFIGURATION
-- ============================================================================
-- Buckets:
-- 1. course-assets (Public read, Admin write)
-- 2. project-assets (Public read, Admin write)
-- 3. avatars (Public read, User write own avatar)
-- 4. student-documents (Private: User read/write own, Admin read)

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('course-assets', 'course-assets', true),
  ('project-assets', 'project-assets', true),
  ('avatars', 'avatars', true),
  ('student-documents', 'student-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Policy for student-documents bucket
CREATE POLICY "Users access own documents"
ON storage.objects FOR ALL
USING (
  bucket_id = 'student-documents' 
  AND (auth.uid()::text = (storage.foldername(name))[1] OR public.is_admin())
);

-- ============================================================================
-- 8. INITIAL SEED DATA
-- ============================================================================
INSERT INTO public.courses (id, slug, title, subtitle, short_description, description, category, level, duration, price, technologies, projects_count, career_support, is_featured, is_active)
VALUES
  ('genai', 'generative-ai', 'Generative AI', 'Build with the Most Transformative Technology', 'Master generative AI development from fundamentals to production-grade applications.', 'Comprehensive generative AI engineering program covering Large Language Models (LLMs), Retrieval Augmented Generation (RAG), embeddings, Vector databases, autonomous agents, and production deployment with FastAPI and Docker.', 'AI', 'Intermediate', '16 Weeks', 799.00, ARRAY['Python', 'OpenAI', 'LangChain', 'RAG', 'Vector Databases', 'FastAPI', 'Hugging Face'], 5, ARRAY['Resume Review', 'LinkedIn Optimization', 'Interview Prep', 'Mock Interviews'], true, true),
  ('aws-cloud', 'aws-cloud', 'AWS Cloud Computing', 'Master the World''s Leading Cloud Platform', 'Become an AWS-certified cloud professional. Design, deploy and manage scalable infrastructure.', 'In-depth cloud architecture and engineering covering AWS core compute, networking, serverless Lambda, microservices orchestration, security, automated CI/CD deployment, and cost optimization.', 'Cloud', 'Beginner to Advanced', '14 Weeks', 699.00, ARRAY['AWS EC2', 'S3', 'RDS', 'Lambda', 'CloudFormation', 'IAM', 'VPC'], 4, ARRAY['Certification Guidance', 'Resume Review', 'LinkedIn Profile', 'Placement Support'], true, true),
  ('devops', 'devops', 'DevOps Full Stack', 'Automate, Deploy and Scale', 'Learn the complete DevOps toolchain from CI/CD to containerization and infrastructure-as-code.', 'Real-world DevOps engineering curriculum covering Linux administration, Docker containerization, Kubernetes cluster orchestration, Terraform IaC, Jenkins/GitHub Actions pipelines, and continuous monitoring with Prometheus & Grafana.', 'DevOps', 'Intermediate', '16 Weeks', 749.00, ARRAY['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible', 'Linux'], 5, ARRAY['Resume Review', 'LinkedIn Optimization', 'Interview Prep', 'Placement Assistance'], false, true),
  ('java-fullstack', 'java-full-stack', 'Java Full Stack Development', 'Enterprise-Grade Development Skills', 'Master the complete Java ecosystem including Spring Boot backend and Angular/React frontend.', 'Production-grade enterprise full stack development covering Core & Advanced Java, Spring Boot microservices, Hibernate/JPA, RESTful API architecture, Angular frontend development, and secure cloud deployment.', 'Development', 'Beginner to Advanced', '20 Weeks', 849.00, ARRAY['Java', 'Spring Boot', 'Angular', 'React', 'MySQL', 'PostgreSQL', 'REST APIs'], 6, ARRAY['Resume Building', 'LinkedIn Optimization', 'Interview Preparation', 'Placement Support'], true, true),
  ('ui-ux-design', 'ui-ux', 'UI/UX Design', 'Design That Solves Real Problems', 'Learn human-centered design from research to delivery. Create stunning, functional digital products.', 'Master design theory, user research methodologies, wireframing, high-fidelity prototyping in Figma, micro-interactions, responsive design systems, and developer handoff workflows.', 'Design', 'Beginner to Intermediate', '12 Weeks', 599.00, ARRAY['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'], 4, ARRAY['Portfolio Review', 'LinkedIn Optimization', 'Interview Prep', 'Placement Support'], false, true)
ON CONFLICT (id) DO NOTHING;
