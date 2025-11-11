import React from 'react'
import { GenericHeading } from '../Generic'

const UserFriendList = () => {
  return (
    <div className="w-full flex flex-col gap-m">
      <div className="w-full flex flex-col gap-s">
        <GenericHeading
          headingType="h4"
          fontStyle="font-sansation font-[700]"
          textColor="text-bordo"
          extraClass="border-b-[1px] border-b-bordo/80 text-center"
        >
          <h2>Приятели</h2>
        </GenericHeading>
      </div>

      <GenericHeading
        headingType="h5"
        fontStyle="font-sansation font-[700]"
        textColor="text-bordo"
        extraClass="text-center"
      >
        <h2>Нямате добавени приятелства</h2>
      </GenericHeading>
    </div>
  )
}

export default UserFriendList
