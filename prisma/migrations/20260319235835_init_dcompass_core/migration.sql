-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'invited', 'suspended', 'disabled');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('client', 'partner', 'admin', 'scanner');

-- CreateEnum
CREATE TYPE "RoleAssignmentStatus" AS ENUM ('active', 'revoked');

-- CreateEnum
CREATE TYPE "PartnerProfileStatus" AS ENUM ('pending', 'active', 'suspended');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('draft', 'shared_for_review', 'approved_for_signing', 'signed', 'valid', 'expired', 'cancelled');

-- CreateEnum
CREATE TYPE "CommissionType" AS ENUM ('percentage', 'fixed');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('draft', 'pending_review', 'approved', 'published', 'sold_out', 'cancelled', 'archived');

-- CreateEnum
CREATE TYPE "TicketTypeStatus" AS ENUM ('draft', 'active', 'sold_out', 'hidden', 'cancelled');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending_payment', 'paid', 'failed', 'cancelled', 'refunded');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('mercado_pago', 'manual');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'approved', 'failed', 'refunded', 'cancelled');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('active', 'expired', 'converted', 'cancelled');

-- CreateEnum
CREATE TYPE "TicketSourceType" AS ENUM ('purchase', 'courtesy');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('issued', 'pending_transfer', 'transferred', 'used', 'cancelled', 'refunded', 'invalidated');

-- CreateEnum
CREATE TYPE "TicketTransferStatus" AS ENUM ('pending', 'accepted', 'completed', 'rejected', 'cancelled', 'expired');

-- CreateEnum
CREATE TYPE "AccessScanStatus" AS ENUM ('success', 'invalid', 'already_used', 'wrong_event', 'expired_token', 'ticket_cancelled', 'scanner_not_authorized');

-- CreateEnum
CREATE TYPE "PayoutType" AS ENUM ('advance', 'final_settlement');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('draft', 'approved', 'scheduled', 'paid', 'failed', 'reversed');

-- CreateEnum
CREATE TYPE "AuditEntityType" AS ENUM ('user', 'role_assignment', 'invitation_code', 'partner_profile', 'partner_contract', 'event', 'ticket_type', 'courtesy_grant', 'order', 'ticket_reservation', 'ticket', 'ticket_transfer', 'scanner_assignment', 'access_scan', 'payout');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firebase_uid" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "full_name" TEXT NOT NULL,
    "phone" TEXT,
    "avatar_url" TEXT,
    "last_login_at" TIMESTAMP(3),
    "status" "UserStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role_assignments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "RoleAssignmentStatus" NOT NULL DEFAULT 'active',
    "granted_by_user_id" TEXT,
    "granted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "user_role_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_profiles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "display_name" TEXT,
    "phone" TEXT,
    "tax_id" TEXT,
    "address" TEXT,
    "bank_account_info" TEXT,
    "status" "PartnerProfileStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation_codes" (
    "code" TEXT NOT NULL,
    "target_role" "UserRole" NOT NULL,
    "status" TEXT NOT NULL,
    "created_by_user_id" TEXT,
    "redeemed_by_user_id" TEXT,
    "redeemed_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitation_codes_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "partner_contracts" (
    "id" TEXT NOT NULL,
    "partner_profile_id" TEXT NOT NULL,
    "contract_number" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL,
    "draft_file_url" TEXT,
    "signed_file_url" TEXT,
    "signed_at" TIMESTAMP(3),
    "starts_at" TIMESTAMP(3),
    "ends_at" TIMESTAMP(3),
    "commission_type" "CommissionType" NOT NULL,
    "commission_value" DECIMAL(10,2) NOT NULL,
    "advance_enabled" BOOLEAN NOT NULL DEFAULT false,
    "advance_percentage" DECIMAL(5,2),
    "advance_days_before_event" INTEGER,
    "final_settlement_delay_days" INTEGER,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partner_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "partner_profile_id" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'draft',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "timezone" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3),
    "doors_open_at" TIMESTAMP(3),
    "venue_name" TEXT NOT NULL,
    "address_line" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "postal_code" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "cover_image_url" TEXT,
    "gallery" JSONB,
    "lineup" JSONB,
    "restrictions" JSONB,
    "access_policy" TEXT,
    "contact_email" TEXT,
    "contact_phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_review_logs" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "action_type" TEXT NOT NULL,
    "performed_by_user_id" TEXT,
    "from_status" "EventStatus",
    "to_status" "EventStatus",
    "notes" TEXT,
    "payload_snapshot" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_review_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_types" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "price_amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "stock_total" INTEGER NOT NULL DEFAULT 0,
    "stock_reserved" INTEGER NOT NULL DEFAULT 0,
    "stock_sold" INTEGER NOT NULL DEFAULT 0,
    "stock_transferred" INTEGER NOT NULL DEFAULT 0,
    "stock_used" INTEGER NOT NULL DEFAULT 0,
    "purchase_limit_per_order" INTEGER,
    "courtesy_enabled" BOOLEAN NOT NULL DEFAULT false,
    "status" "TicketTypeStatus" NOT NULL DEFAULT 'draft',
    "sales_start_at" TIMESTAMP(3),
    "sales_end_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courtesy_grants" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,
    "issued_by_user_id" TEXT,
    "assigned_to_user_id" TEXT,
    "status" TEXT NOT NULL,
    "commission_base_amount" DECIMAL(10,2),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_at" TIMESTAMP(3),

    CONSTRAINT "courtesy_grants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "buyer_user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "currency" TEXT NOT NULL,
    "subtotal_amount" DECIMAL(10,2) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "payment_provider" "PaymentProvider" NOT NULL,
    "payment_reference" TEXT,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price_amount" DECIMAL(10,2) NOT NULL,
    "line_total_amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_reservations" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,
    "buyer_user_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "released_at" TIMESTAMP(3),
    "converted_to_order_id" TEXT,

    CONSTRAINT "ticket_reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "ticket_type_id" TEXT NOT NULL,
    "order_id" TEXT,
    "owner_user_id" TEXT NOT NULL,
    "issued_to_user_id" TEXT,
    "source_type" "TicketSourceType" NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'issued',
    "serial_code" TEXT NOT NULL,
    "dynamic_qr_seed_ref" TEXT,
    "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "refunded_at" TIMESTAMP(3),

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_transfers" (
    "id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "from_user_id" TEXT NOT NULL,
    "to_user_id" TEXT NOT NULL,
    "status" "TicketTransferStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "expired_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "cancelled_by_user_id" TEXT,
    "rejection_reason" TEXT,

    CONSTRAINT "ticket_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_contacts" (
    "id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "contact_user_id" TEXT NOT NULL,
    "nickname" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scanner_assignments" (
    "id" TEXT NOT NULL,
    "scanner_user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assigned_by_user_id" TEXT,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked_at" TIMESTAMP(3),

    CONSTRAINT "scanner_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_scans" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "ticket_id" TEXT,
    "scanner_user_id" TEXT,
    "scan_status" "AccessScanStatus" NOT NULL,
    "reason_code" TEXT,
    "scanned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_id" TEXT,
    "metadata" JSONB,

    CONSTRAINT "access_scans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payouts" (
    "id" TEXT NOT NULL,
    "partner_profile_id" TEXT NOT NULL,
    "event_id" TEXT,
    "payout_type" "PayoutType" NOT NULL,
    "status" "PayoutStatus" NOT NULL,
    "gross_sales_amount" DECIMAL(12,2) NOT NULL,
    "processor_fee_amount" DECIMAL(12,2) NOT NULL,
    "dcompass_fee_amount" DECIMAL(12,2) NOT NULL,
    "courtesy_commission_amount" DECIMAL(12,2) NOT NULL,
    "net_eligible_amount" DECIMAL(12,2) NOT NULL,
    "payout_amount" DECIMAL(12,2) NOT NULL,
    "scheduled_for" TIMESTAMP(3),
    "paid_at" TIMESTAMP(3),
    "approved_by_user_id" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actor_user_id" TEXT,
    "entity_type" "AuditEntityType" NOT NULL,
    "entity_id" TEXT NOT NULL,
    "action_type" TEXT NOT NULL,
    "old_values" JSONB,
    "new_values" JSONB,
    "context" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_firebase_uid_key" ON "User"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "user_role_assignments_user_id_idx" ON "user_role_assignments"("user_id");

-- CreateIndex
CREATE INDEX "user_role_assignments_role_status_idx" ON "user_role_assignments"("role", "status");

-- CreateIndex
CREATE UNIQUE INDEX "partner_profiles_user_id_key" ON "partner_profiles"("user_id");

-- CreateIndex
CREATE INDEX "invitation_codes_target_role_status_idx" ON "invitation_codes"("target_role", "status");

-- CreateIndex
CREATE UNIQUE INDEX "partner_contracts_contract_number_key" ON "partner_contracts"("contract_number");

-- CreateIndex
CREATE INDEX "partner_contracts_partner_profile_id_status_idx" ON "partner_contracts"("partner_profile_id", "status");

-- CreateIndex
CREATE INDEX "events_partner_profile_id_status_idx" ON "events"("partner_profile_id", "status");

-- CreateIndex
CREATE INDEX "events_status_start_at_idx" ON "events"("status", "start_at");

-- CreateIndex
CREATE INDEX "event_review_logs_event_id_created_at_idx" ON "event_review_logs"("event_id", "created_at");

-- CreateIndex
CREATE INDEX "ticket_types_event_id_status_idx" ON "ticket_types"("event_id", "status");

-- CreateIndex
CREATE INDEX "courtesy_grants_event_id_status_idx" ON "courtesy_grants"("event_id", "status");

-- CreateIndex
CREATE INDEX "orders_buyer_user_id_created_at_idx" ON "orders"("buyer_user_id", "created_at");

-- CreateIndex
CREATE INDEX "orders_event_id_status_idx" ON "orders"("event_id", "status");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "ticket_reservations_buyer_user_id_status_idx" ON "ticket_reservations"("buyer_user_id", "status");

-- CreateIndex
CREATE INDEX "ticket_reservations_event_id_ticket_type_id_status_idx" ON "ticket_reservations"("event_id", "ticket_type_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_serial_code_key" ON "tickets"("serial_code");

-- CreateIndex
CREATE INDEX "tickets_event_id_status_idx" ON "tickets"("event_id", "status");

-- CreateIndex
CREATE INDEX "tickets_owner_user_id_status_idx" ON "tickets"("owner_user_id", "status");

-- CreateIndex
CREATE INDEX "ticket_transfers_ticket_id_status_idx" ON "ticket_transfers"("ticket_id", "status");

-- CreateIndex
CREATE INDEX "ticket_transfers_to_user_id_status_idx" ON "ticket_transfers"("to_user_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "user_contacts_owner_user_id_contact_user_id_key" ON "user_contacts"("owner_user_id", "contact_user_id");

-- CreateIndex
CREATE INDEX "scanner_assignments_scanner_user_id_status_idx" ON "scanner_assignments"("scanner_user_id", "status");

-- CreateIndex
CREATE INDEX "scanner_assignments_event_id_status_idx" ON "scanner_assignments"("event_id", "status");

-- CreateIndex
CREATE INDEX "access_scans_event_id_scanned_at_idx" ON "access_scans"("event_id", "scanned_at");

-- CreateIndex
CREATE INDEX "access_scans_ticket_id_scan_status_idx" ON "access_scans"("ticket_id", "scan_status");

-- CreateIndex
CREATE INDEX "payouts_partner_profile_id_status_idx" ON "payouts"("partner_profile_id", "status");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_created_at_idx" ON "audit_logs"("entity_type", "entity_id", "created_at");

-- CreateIndex
CREATE INDEX "audit_logs_actor_user_id_created_at_idx" ON "audit_logs"("actor_user_id", "created_at");

-- AddForeignKey
ALTER TABLE "user_role_assignments" ADD CONSTRAINT "user_role_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role_assignments" ADD CONSTRAINT "user_role_assignments_granted_by_user_id_fkey" FOREIGN KEY ("granted_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_profiles" ADD CONSTRAINT "partner_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_codes" ADD CONSTRAINT "invitation_codes_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_codes" ADD CONSTRAINT "invitation_codes_redeemed_by_user_id_fkey" FOREIGN KEY ("redeemed_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_contracts" ADD CONSTRAINT "partner_contracts_partner_profile_id_fkey" FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_partner_profile_id_fkey" FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_review_logs" ADD CONSTRAINT "event_review_logs_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_review_logs" ADD CONSTRAINT "event_review_logs_performed_by_user_id_fkey" FOREIGN KEY ("performed_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_types" ADD CONSTRAINT "ticket_types_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courtesy_grants" ADD CONSTRAINT "courtesy_grants_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courtesy_grants" ADD CONSTRAINT "courtesy_grants_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyer_user_id_fkey" FOREIGN KEY ("buyer_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_reservations" ADD CONSTRAINT "ticket_reservations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_reservations" ADD CONSTRAINT "ticket_reservations_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_reservations" ADD CONSTRAINT "ticket_reservations_buyer_user_id_fkey" FOREIGN KEY ("buyer_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_reservations" ADD CONSTRAINT "ticket_reservations_converted_to_order_id_fkey" FOREIGN KEY ("converted_to_order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_ticket_type_id_fkey" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_issued_to_user_id_fkey" FOREIGN KEY ("issued_to_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_transfers" ADD CONSTRAINT "ticket_transfers_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_transfers" ADD CONSTRAINT "ticket_transfers_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_transfers" ADD CONSTRAINT "ticket_transfers_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_contact_user_id_fkey" FOREIGN KEY ("contact_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scanner_assignments" ADD CONSTRAINT "scanner_assignments_scanner_user_id_fkey" FOREIGN KEY ("scanner_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scanner_assignments" ADD CONSTRAINT "scanner_assignments_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_scans" ADD CONSTRAINT "access_scans_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_scans" ADD CONSTRAINT "access_scans_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_scans" ADD CONSTRAINT "access_scans_scanner_user_id_fkey" FOREIGN KEY ("scanner_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_partner_profile_id_fkey" FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_approved_by_user_id_fkey" FOREIGN KEY ("approved_by_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
