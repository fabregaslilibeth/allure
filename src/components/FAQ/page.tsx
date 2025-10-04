"use client";
import { useState } from "react";
import styles from "./style.module.css";
import { faqData } from "@/data/faq";

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
    <div className="min-h-screen mx-auto bg-primary flex items-center justify-center">
      <div className="max-w-7xl grid grid-cols-2 gap-4">
        {/* Left Column - Introduction */}
        <div className="flex flex-col">
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
                  <p className={styles.answer}>
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
              
              {index < faqData.length - 1 && <div className="border-b border-gray-500" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
