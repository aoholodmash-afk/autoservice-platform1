-- ============================================
-- AutoService Platform — Supabase Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== TENANTS (Филиалы автосервисов) =====
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  work_hours TEXT DEFAULT '09:00–20:00',
  boxes INTEGER DEFAULT 2,
  service_categories TEXT[] DEFAULT '{}',
  tariff TEXT DEFAULT 'start' CHECK (tariff IN ('start', 'business', 'pro')),
  is_active BOOLEAN DEFAULT true,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== ADMIN USERS (Администраторы) =====
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  login TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'mechanic')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== CLIENTS (Клиенты) =====
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  telegram_chat_id TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== VEHICLES (Автомобили клиентов) =====
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  engine TEXT,
  plate TEXT,
  vin TEXT,
  mileage INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SERVICES (Услуги филиала) =====
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  labor_price INTEGER NOT NULL DEFAULT 0,
  duration INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== STOCK (Склад запчастей) =====
CREATE TABLE stock_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  article TEXT,
  brand TEXT,
  category TEXT,
  quantity INTEGER DEFAULT 0,
  min_quantity INTEGER DEFAULT 1,
  purchase_price INTEGER DEFAULT 0,
  sell_price INTEGER DEFAULT 0,
  supplier TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== STOCK MOVEMENTS (Движения склада) =====
CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  item_id UUID REFERENCES stock_items(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('incoming', 'outgoing')),
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  total INTEGER NOT NULL,
  document TEXT,
  supplier TEXT,
  order_id UUID,
  responsible TEXT,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== BOOKINGS (Записи) =====
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  service_name TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== ORDERS (Заказ-наряды) =====
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  vehicle_name TEXT,
  services JSONB DEFAULT '[]',
  parts JSONB DEFAULT '[]',
  labor_total INTEGER DEFAULT 0,
  parts_total INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  mechanic_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ===== REVIEWS (Отзывы) =====
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== INDEXES =====
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_admin_users_tenant ON admin_users(tenant_id);
CREATE INDEX idx_admin_users_login ON admin_users(login);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_vehicles_client ON vehicles(client_id);
CREATE INDEX idx_services_tenant ON services(tenant_id);
CREATE INDEX idx_stock_items_tenant ON stock_items(tenant_id);
CREATE INDEX idx_bookings_tenant ON bookings(tenant_id);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_orders_tenant ON orders(tenant_id);
CREATE INDEX idx_orders_client ON orders(client_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_tenant ON reviews(tenant_id);

-- ===== RLS (Row Level Security) =====
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read for tenants (for client app)
CREATE POLICY "Tenants are viewable by everyone" ON tenants
  FOR SELECT USING (is_active = true);

-- Admin users can see their own tenant data
CREATE POLICY "Admin users see own tenant" ON admin_users
  FOR SELECT USING (true);

-- Services are viewable by everyone
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (is_active = true);

-- Bookings: public insert, admin read/update
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all bookings" ON bookings
  FOR SELECT USING (true);

-- Orders: admin only
CREATE POLICY "Admin can manage orders" ON orders
  FOR ALL USING (true);

-- Reviews: public insert, public read
CREATE POLICY "Anyone can create reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);
