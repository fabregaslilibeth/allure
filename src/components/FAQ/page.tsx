"use client";
import { useState } from "react";
import styles from "./style.module.css";
import { faqData } from "@/data/faq";
import { assistant } from "@/fonts/index";

export default function FAQ() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]); // First two items expanded by default

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen w-full mx-auto bg-primary flex items-center justify-center text-primary" style={{ background: 'url(https://sdmntpraustraliaeast.oaiusercontent.com/files/00000000-3ca0-61fa-b024-e01f7ddc6fe2/raw?se=2025-10-05T08%3A00%3A43Z&sp=r&sv=2024-08-04&sr=b&scid=ff830811-1179-503d-ae6d-9422bc4be459&skoid=8cb40e9f-389f-4cf6-afaa-e5bd4c7fd98c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-04T22%3A23%3A15Z&ske=2025-10-05T22%3A23%3A15Z&sks=b&skv=2024-08-04&sig=pj21WEywaRZEBMlET1ImNHZy8ey6L6jfVVwHkvo1xLw%3D) no-repeat center center', backgroundSize: '100%' }}>
      <div className="max-w-7xl grid grid-cols-2 gap-4">
        {/* Left Column - Introduction */}
        <div className="col-span-2 md:col-span-1 flex flex-col">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="text-sm">
            Didn't find the answer to your question? Send it to us by chat. We will be happy to answer you!
          </p>
          <button className="bg-secondary text-primary px-4 py-2 rounded-md w-fit">
            Contact
          </button>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="flex flex-col">
          {faqData.map((item, index) => (
            <div key={item.id} className="w-full">
              <div 
                className="flex justify-between items-center py-6"
                onClick={() => toggleExpanded(item.id)}
              >
                <h3 className="text-lg font-bold">{item.question}</h3>
                <div className="flex items-center">
                  {expandedItems.includes(item.id) ? (
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 7L6 2L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              
              {expandedItems.includes(item.id) && (
                <div className={styles.answerContainer}>
                  <p className={`${styles.answer} ${assistant.className}`}>
                    {item.isLink ? (
                      <>
                        {item.answer.split(item.linkText!)[0]}
                        <a href={item.linkUrl} className={styles.link}>
                          {item.linkText}
                        </a>
                        {item.answer.split(item.linkText!)[1]}
                      </>
                    ) : (
                      item.answer
                    )}
                  </p>
                </div>
              )}
              
              {index < faqData.length - 1 && <div className="border-b border-indigo-200" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
