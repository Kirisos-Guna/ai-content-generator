"use client"
import { useState } from 'react';
import Footer from './_components/Footer';
import SearchSection from './_components/SearchSection';
import TemplateListSection from './_components/TemplateListSection';

function Dashboard() {
    const [userSearchInput, setUserSearchInput] = useState<string>()
    return (
      <>
        <div>
          {/* Search Section  */}
          <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />

          {/* Template List Section  */}
          <TemplateListSection userSearchInput={userSearchInput} />
        </div>
        <Footer />
      </>
    )
}

export default Dashboard