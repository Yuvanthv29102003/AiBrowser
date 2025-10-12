import React from 'react';
import Button from '../buttons/Button';

interface ProfileCardProps {
  name: string;
  email: string;
  gender: string;
  avatar: string;
  onEditProfile?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  name, 
  email, 
  gender,
  avatar, 
  onEditProfile 
}) => {
  return (
    <div className="bg-white rounded-lg mb-2 flex items-center justify-between w-full h-full">
      <div className="flex items-center space-x-6">
        {/* Profile Photo */}
        <div className="relative">
          <img 
            src={avatar} 
            alt={name} 
            className="w-24 h-24 rounded-lg object-cover"
          />
        </div>
        
        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col space-y-1">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {gender}
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {email}
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Button */}
      <div className="flex items-center">
        <Button
          onClick={onEditProfile}
          label={
            <div className="flex items-center">
              <img 
                src="/images/edit.png" 
                alt="Edit" 
                className="w-[24px] h-[24px] mr-2 brightness-0 invert"
              />
              <span className="font-['Lexend'] font-light text-base leading-6 tracking-normal">Edit Profile</span>
            </div>
          }
          className="px-4 py-2 text-white bg-[#7152F3] border border-[#7152F3] rounded-md hover:bg-[#5e44d1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7152F3]"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
