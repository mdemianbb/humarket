-- =============================================
-- HUMARKET - Datos de ejemplo (fake data)
-- Ejecutar DESPUÉS del schema.sql
-- =============================================

-- Partners
insert into partners (id, name, company, email) values
  ('aaaaaaaa-0001-0001-0001-000000000001', 'Sofía Martínez', 'PayFlex Solutions', 'sofia@payflex.com'),
  ('aaaaaaaa-0002-0002-0002-000000000002', 'Lucas Fernández', 'LearnUp Academy', 'lucas@learnup.io'),
  ('aaaaaaaa-0003-0003-0003-000000000003', 'Valentina Torres', 'WellBeing Co.', 'valen@wellbeing.co');

-- Apps publicadas
insert into apps (partner_id, name, description, category, type, logo_url, price, price_model, commission_pct, status) values

  -- PayFlex (SaaS)
  ('aaaaaaaa-0001-0001-0001-000000000001',
   'PayFlex',
   'Plataforma de gestión de liquidación de sueldos integrada con el legajo del empleado. Automatiza cálculos, genera recibos y sincroniza novedades en tiempo real.',
   'Payroll', 'saas',
   'https://img.logo.dev/payflex.com?token=pk_X8lWevjHQAqHbHXEhIz5Ng',
   299, 'monthly', 0, 'published'),

  -- LearnUp (SaaS)
  ('aaaaaaaa-0002-0002-0002-000000000002',
   'LearnUp',
   'LMS corporativo con más de 500 cursos en español. Asigná capacitaciones por rol, medí el progreso y generá certificados automáticos.',
   'Capacitación', 'saas',
   'https://img.logo.dev/learnup.io?token=pk_X8lWevjHQAqHbHXEhIz5Ng',
   199, 'per_seat', 0, 'published'),

  -- WellBeing (Servicio)
  ('aaaaaaaa-0003-0003-0003-000000000003',
   'WellBeing360',
   'Programa de bienestar integral: sesiones de mindfulness, psicología online y coaching de vida para empleados. Incluye panel de métricas de salud organizacional.',
   'Bienestar', 'service',
   'https://img.logo.dev/wellbeing.co?token=pk_X8lWevjHQAqHbHXEhIz5Ng',
   450, 'monthly', 0, 'published'),

  -- Beneficios (SaaS)
  ('aaaaaaaa-0001-0001-0001-000000000001',
   'BenefitHub',
   'Marketplace de beneficios para empleados: descuentos en gimnasios, gastronomía, entretenimiento y más. Cada empleado elige los beneficios que más le sirven.',
   'Beneficios', 'saas',
   null,
   0, 'commission', 15, 'published'),

  -- TeamBuilding (Servicio)
  ('aaaaaaaa-0002-0002-0002-000000000002',
   'TeamSpark',
   'Actividades de teambuilding presenciales y virtuales: escape rooms, cooking challenges, olimpiadas, y más. Coordinación completa incluida.',
   'Bienestar', 'service',
   null,
   800, 'monthly', 0, 'published'),

  -- Firma digital (SaaS)
  ('aaaaaaaa-0003-0003-0003-000000000003',
   'SignHR',
   'Firma digital de documentos laborales: contratos, recibos de sueldo, políticas internas. Validez legal, trazabilidad completa y envío automático.',
   'RRHH', 'saas',
   null,
   149, 'monthly', 0, 'published');

-- Comunidades (empresas cliente de Humand)
insert into communities (id, name, industry, employees, plan, logo_url) values
  ('bbbbbbbb-0001-0001-0001-000000000001', 'Grupo Clarín', 'Medios y Comunicación', 3200, 'enterprise',
   'https://img.logo.dev/clarin.com?token=pk_X8lWevjHQAqHbHXEhIz5Ng'),
  ('bbbbbbbb-0002-0002-0002-000000000002', 'Mercado Libre', 'E-Commerce y Tecnología', 12000, 'enterprise',
   'https://img.logo.dev/mercadolibre.com?token=pk_X8lWevjHQAqHbHXEhIz5Ng'),
  ('bbbbbbbb-0003-0003-0003-000000000003', 'Santander Argentina', 'Finanzas y Banca', 7800, 'enterprise',
   'https://img.logo.dev/santander.com.ar?token=pk_X8lWevjHQAqHbHXEhIz5Ng'),
  ('bbbbbbbb-0004-0004-0004-000000000004', 'Rappi Argentina', 'Tecnología', 450, 'pro',
   'https://img.logo.dev/rappi.com?token=pk_X8lWevjHQAqHbHXEhIz5Ng'),
  ('bbbbbbbb-0005-0005-0005-000000000005', 'Cervecería Quilmes', 'Consumo Masivo', 2100, 'pro',
   'https://img.logo.dev/quilmes.com.ar?token=pk_X8lWevjHQAqHbHXEhIz5Ng');
