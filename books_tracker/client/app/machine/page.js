"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import QuestionDropdown from '../components/scribeselection';

const Page = () => {

 return (
    <div>
     <main className="flex min-h-screen flex-col items-center justify-between ">
        <QuestionDropdown
        />
    </main>
    </div>
 );
};

export default Page;