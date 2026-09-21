const fs = require('fs');
const path = require('path');

const refactorTargets = [
  {
    feature: 'dashboard',
    appPath: 'src/app/(admin)/dashboard/page.tsx',
    componentName: 'DashboardPage',
    componentFile: 'dashboard-page.tsx'
  },
  {
    feature: 'merchant',
    appPath: 'src/app/(admin)/merchant/page.tsx',
    componentName: 'MerchantPage',
    componentFile: 'merchant-page.tsx'
  },
  {
    feature: 'wallet',
    appPath: 'src/app/(admin)/wallet/page.tsx',
    componentName: 'WalletDashboardPage',
    componentFile: 'wallet-dashboard-page.tsx'
  },
  {
    feature: 'wallet',
    appPath: 'src/app/(admin)/wallet/fund-requests/page.tsx',
    componentName: 'FundRequestsPage',
    componentFile: 'fund-requests-page.tsx'
  },
  {
    feature: 'wallet',
    appPath: 'src/app/(admin)/wallet/withdrawals/page.tsx',
    componentName: 'WithdrawalsPage',
    componentFile: 'withdrawals-page.tsx'
  },
  {
    feature: 'wallet',
    appPath: 'src/app/(admin)/wallet/whitelist/page.tsx',
    componentName: 'WhitelistPage',
    componentFile: 'whitelist-page.tsx'
  },
  {
    feature: 'beneficiary',
    appPath: 'src/app/(admin)/beneficiaries/page.tsx',
    componentName: 'BeneficiariesPage',
    componentFile: 'beneficiaries-page.tsx'
  },
  {
    feature: 'payout',
    appPath: 'src/app/(admin)/payouts/page.tsx',
    componentName: 'PayoutsPage',
    componentFile: 'payouts-page.tsx'
  },
  {
    feature: 'wallet-transactions', // Actually van goes to van or wallet? Let's use van
    featureName: 'van',
    appPath: 'src/app/(admin)/van/page.tsx',
    componentName: 'VanManagementPage',
    componentFile: 'van-management-page.tsx'
  },
  {
    feature: 'reports',
    appPath: 'src/app/(admin)/settlement/page.tsx',
    componentName: 'SettlementPage',
    componentFile: 'settlement-page.tsx' // Wait, settlement should be its own feature, but the user has reports. Actually user has 'settlement' maybe? Wait, user list had: 'reports', 'payout', 'wallet', 'dashboard', 'beneficiary', 'wallet-transactions', 'wallet-whitelist', 'withdrawal-request', 'security', 'support'. I'll just create the feature directories if they don't exist.
  },
  {
    feature: 'fees',
    appPath: 'src/app/(admin)/fees/page.tsx',
    componentName: 'FeesPage',
    componentFile: 'fees-page.tsx'
  },
  {
    feature: 'reports',
    appPath: 'src/app/(admin)/reports/page.tsx',
    componentName: 'ReportsPage',
    componentFile: 'reports-page.tsx'
  },
  {
    feature: 'notification',
    appPath: 'src/app/(admin)/notifications/page.tsx',
    componentName: 'NotificationsPage',
    componentFile: 'notifications-page.tsx'
  },
  {
    feature: 'security',
    appPath: 'src/app/(admin)/api-management/credentials/page.tsx',
    componentName: 'ApiCredentialsPage',
    componentFile: 'api-credentials-page.tsx'
  },
  {
    feature: 'auth', // Admin users can go to users feature
    featureName: 'users',
    appPath: 'src/app/(admin)/users/admins/page.tsx',
    componentName: 'UsersPage',
    componentFile: 'users-page.tsx'
  }
];

// Helper to ensure dir exists
function ensureDirSync(dirpath) {
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }
}

for (const target of refactorTargets) {
  const featureName = target.featureName || target.feature;
  const appFile = path.join(__dirname, target.appPath);
  
  if (!fs.existsSync(appFile)) {
    console.log(`Skipping ${target.appPath}, does not exist`);
    continue;
  }

  const content = fs.readFileSync(appFile, 'utf8');
  
  const featureDir = path.join(__dirname, `src/features/${featureName}`);
  const componentsDir = path.join(featureDir, 'components');
  ensureDirSync(componentsDir);

  const newComponentPath = path.join(componentsDir, target.componentFile);
  
  // Write the component to features
  fs.writeFileSync(newComponentPath, content, 'utf8');
  
  // Export from index.ts
  const indexFile = path.join(featureDir, 'index.ts');
  const exportStatement = `export { default as ${target.componentName} } from './components/${target.componentFile.replace('.tsx', '')}';\n`;
  
  // if export statement contains "export default async function", we need to just export it normally.
  // Wait, in the page.tsx, we have `export default async function Name()`.
  // When we import in index.ts: `export { default as Name } from './components/name';`
  
  if (fs.existsSync(indexFile)) {
    const indexContent = fs.readFileSync(indexFile, 'utf8');
    if (!indexContent.includes(exportStatement.trim())) {
      fs.appendFileSync(indexFile, exportStatement);
    }
  } else {
    fs.writeFileSync(indexFile, exportStatement, 'utf8');
  }

  // Update app page.tsx
  const appPageContent = `import { ${target.componentName} } from "@/features/${featureName}";

export default async function Page() {
  return <${target.componentName} />;
}
`;
  fs.writeFileSync(appFile, appPageContent, 'utf8');
  console.log(`Refactored ${target.appPath} -> src/features/${featureName}`);
}

console.log("Refactoring complete.");
