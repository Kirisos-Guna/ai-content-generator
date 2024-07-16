import { UserProfile } from '@clerk/nextjs';
import Footer from '../_components/Footer';

function Settings() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <UserProfile />
      </div>
      <Footer />
    </div>
  );
}

export default Settings;
