'use client'

import React, { useCallback, useState, useTransition } from 'react'
import { GenericButton, GenericHeading, GenericParagraph } from '../Generic'
import { AddFriendComponent } from '../Auth'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { DeleteIcon } from '@/assets/icons'
import { daysUntilNextOccurrence } from '@/utils/calculateDaysToBirthday'
import { removeFriendForCurrentUser } from '@/action/friends'
import { setUser } from '@/store/features/root'

const UserFriendList = () => {
  const dispatch = useAppDispatch()
  const friends = useAppSelector((state) => state.root.user?.friends)
  const userId = useAppSelector((state) => state.root.user?.id)
  const [showForm, setShowForm] = useState(false)
  const [pending, start] = useTransition()

  const showFormHandler = useCallback((boolean: boolean) => {
    setShowForm(boolean)
  }, [])

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

        <div>
          <GenericParagraph
            fontStyle="font-sansation font-[400]"
            textColor="text-brown"
            extraClass="text-center"
          >
            Добевете вашите приятели и ще получавате двуседмично предизвестие преди тяхните рожденни
            дни, за да изберете най-подходящия подарък за събитието.
          </GenericParagraph>
        </div>
      </div>

      {friends && friends.length > 0 ? (
        <div className="w-full flex flex-col gap-s">
          <GenericHeading
            headingType="h5"
            fontStyle="font-sansation font-[700]"
            textColor="text-bordo"
            extraClass="text-center"
          >
            <h2>Добавени приятелства:</h2>
          </GenericHeading>
          <div className="w-full flex flex-col gap-s">
            {friends.map((friend) => {
              return (
                <div
                  key={friend.id}
                  className="w-full flex flex-col gap-s border-brown/80 rounded-[16px] border-[1px] bg-brown/20 py-2 px-2 md:p-4"
                >
                  <div className="w-full flex flex-col lg:flex-row items-center gap-6 md:gap-2">
                    <div className="flex flex-col gap-s">
                      <GenericHeading
                        headingType="h5"
                        fontStyle="font-sansation font-[700]"
                        textColor="text-brown"
                        extraClass="text-center border-b-[1px] border-brown pb-2 md:border-b-[0] md:pb-0"
                      >
                        <h2>{friend.name}</h2>
                      </GenericHeading>

                      <GenericParagraph
                        fontStyle="font-sansation font-[700]"
                        textColor="text-bordo"
                        extraClass="text-center"
                      >
                        {friend.date}
                      </GenericParagraph>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                      <div className="p-2 bg-brown rounded-[8px]">
                        <GenericParagraph
                          fontStyle="font-sansation font-[400]"
                          textColor="text-white"
                          extraClass="text-center"
                        >
                          {daysUntilNextOccurrence(friend.date as string) === 0
                            ? 'Събитието е днес'
                            : `остават ${daysUntilNextOccurrence(friend.date as string)} дни до събитието`}
                        </GenericParagraph>
                      </div>
                      <button
                        className="w-[24px] h-[24px] flex justify-center items-center hover:opacity-50 transition-opacity duration-500 ease-in-out"
                        aria-label="Премахни приятелство"
                        onClick={() => {
                          if (!userId) return
                          const email = friend.email as string

                          start(async () => {
                            const updated = await removeFriendForCurrentUser(email, userId)

                            if (!!updated.user) {
                              dispatch(setUser(updated.user))
                            }
                          })
                        }}
                        disabled={pending}
                      >
                        <div className={`${pending ? 'animate-spin' : ''}`}>
                          <DeleteIcon />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <GenericHeading
          headingType="h5"
          fontStyle="font-sansation font-[700]"
          textColor="text-bordo"
          extraClass="text-center"
        >
          <h2>Нямате добавени приятелства</h2>
        </GenericHeading>
      )}

      <div className="w-full flex flex-col gap-m justify-center items-center">
        {showForm ? (
          <div className="w-full flex justify-center items-center">
            <AddFriendComponent showFormHandler={showFormHandler} />
          </div>
        ) : (
          <GenericButton styleClass="w-full md:w-fit" type="button" click={() => setShowForm(true)}>
            Добави приятел
          </GenericButton>
        )}
      </div>
    </div>
  )
}

export default UserFriendList
