// components/Accordion.js
import { useAuth } from '@/contexts/AuthContext';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextArea from './TextArea';

const Accordion = ({ items, handleOption, handleNotes }) => {
  const [t] = useTranslation();
  const { currentUser } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => {
        let totalOk = 0;
        let totalNotOk = 0;
        let totalToJudge = 0;
        item.options.forEach((option) => {
          if (option.ok) totalOk += 1;
          if (option.notOk) totalNotOk += 1;
          if (option.toJudge) totalToJudge += 1;

          // If the option has nested options, recursively iterate
          if (option.options) {
            iterateOptions(option.options);
          }
        });
        return (
          <div key={index} className="mb-1">
            <div
              className="flex items-center justify-between p-2 bg-gray-200 cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <h1 className="text-2xl">
                <span className="heading_underline ">{t(item.name)}</span>{' '}
                {/* <span className="text-xl text-green-500">
                  <CheckCircleIcon className="inline w-[30px] h-[30px]" />{' '}
                  <span className="text-black">({totalOk})</span>
                </span> */}
                <span
                  className={`ml-5 text-xl text-red-500 ${
                    totalNotOk === 0 && 'hidden'
                  }`}
                >
                  <XCircleIcon className="inline w-[30px] h-[30px]" />{' '}
                  <span className="text-black">({totalNotOk})</span>
                </span>
                <span
                  className={`ml-5 text-xl text-yellow-500 ${
                    totalToJudge === 0 && 'hidden'
                  }`}
                >
                  <ExclamationTriangleIcon className="inline w-[30px] h-[30px]" />{' '}
                  <span className="text-black">({totalToJudge})</span>
                </span>
              </h1>
              <div>
                {openIndex === index ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>
            </div>
            {openIndex === index && (
              <div className="p-2 bg-gray-100">
                {item.options.map((op, i) => (
                  <div
                    key={`${op}_${i}`}
                    className="py-2 flex justify-between items-center"
                  >
                    <div className="text-lg">- {t(op.name)}</div>
                    <div>
                      <CheckCircleIcon
                        className={`inline ${
                          currentUser ? 'cursor-pointer' : !op.ok && 'hidden'
                        } w-[30px] h-[30px] ${
                          op.ok ? 'text-green-500' : 'text-slate-300'
                        }`}
                        onClick={() =>
                          currentUser ? handleOption(index, i, 'ok') : null
                        }
                      />
                      <XCircleIcon
                        className={`ml-2 inline ${
                          currentUser ? 'cursor-pointer' : !op.notOk && 'hidden'
                        } w-[30px] h-[30px] ${
                          op.notOk ? 'text-red-500' : 'text-slate-300'
                        }`}
                        onClick={() =>
                          currentUser ? handleOption(index, i, 'notOk') : null
                        }
                      />
                      <ExclamationTriangleIcon
                        className={`ml-2 inline ${
                          currentUser
                            ? 'cursor-pointer'
                            : !op.toJudge && 'hidden'
                        } w-[30px] h-[30px] ${
                          op.toJudge ? 'text-yellow-500' : 'text-slate-300'
                        }`}
                        onClick={() =>
                          currentUser ? handleOption(index, i, 'toJudge') : null
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {openIndex === index && (
              <TextArea
                label={t('notes')}
                name="interier"
                value={item.notes}
                placeholder={t('enter_notes')}
                onChange={(e) => handleNotes(index, e.target.value)}
                readOnly={!currentUser}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
