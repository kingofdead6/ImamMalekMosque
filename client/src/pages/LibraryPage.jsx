import React from 'react'
import LibraryHero from '../components/Library/LibraryHero'
import LibraryTimes from '../components/Library/LibraryTimes'
import LibraryActions from '../components/Library/LibraryActions'

const LibraryPage = () => {
  return (
    <div>
        <LibraryHero />
        <LibraryTimes />
        <LibraryActions />
    </div>
  )
}

export default LibraryPage