git add src/components/common src/components/ui
git commit -m "feat(ui): add common ui components (PageHeader, StatCard, StatusBadge, Table)"

git add src/features/dashboard "src/app/(admin)/dashboard"
git commit -m "feat(dashboard): implement operational dashboard UI with metrics and charts"

git add src/features/merchant "src/app/(admin)/merchant"
git commit -m "feat(merchant): implement merchant management list and details UI"

git add src/features/wallet "src/app/(admin)/wallet"
git commit -m "feat(wallet): implement wallet dashboard, fund requests, and whitelist UI"

git add src/features/payout "src/app/(admin)/payouts"
git commit -m "feat(payout): implement payouts management and monitoring UI"

git add src/features/beneficiary "src/app/(admin)/beneficiaries"
git commit -m "feat(beneficiary): implement beneficiary monitoring UI"

git add src/features/van "src/app/(admin)/van"
git commit -m "feat(van): implement virtual account number (VAN) management UI"

git add src/features/reports src/features/fees "src/app/(admin)/settlement" "src/app/(admin)/fees" "src/app/(admin)/reports"
git commit -m "feat(finance): implement settlement, fees, and reporting UIs"

git add src/features/notification src/features/security src/features/users "src/app/(admin)/notifications" "src/app/(admin)/api-management" "src/app/(admin)/users"
git commit -m "feat(system): implement notifications, API credentials, and RBAC admin users UI"

git push origin dev
