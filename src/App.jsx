import React, { useState } from 'react';
import { Lock, Unlock, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import './index.css';

const TARGET_PIN = [2, 0, 2, 6]; // Kombinasi kunci yang benar

export default function LockPinForm() {
  const [digits, setDigits] = useState([0, 0, 0, 0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isError, setIsError] = useState(false);

  // Mengubah digit (+1 atau -1 secara melingkar 0-9)
  const handleDigitChange = (index, delta) => {
    if (isUnlocked) return;
    setDigits((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] + delta + 10) % 10;
      return updated;
    });
    setIsError(false); // Reset error when user changes digits
  };

  // Cek validasi kombinasi
  const handleVerify = () => {
    const isCorrect = digits.every((val, idx) => val === TARGET_PIN[idx]);
    if (isCorrect) {
      setIsUnlocked(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="lock-screen-container">
      <div className="lock-card">

        {/* Penarik Gembok (Shackle) dengan Animasi Buka */}
        <div className={`shackle ${isUnlocked ? 'unlocked' : ''}`} />

        {/* Bodi Utama Gembok */}
        <div className="lock-body">

          {/* Subtle reflection effect */}
          <div className="lock-reflection"></div>

          <div className="lock-header">
            {isUnlocked ? (
              <Unlock className="lock-icon-unlocked" size={24} />
            ) : (
              <Lock className="lock-icon-locked" size={24} />
            )}
            <h2 className="lock-title">
              {isUnlocked ? 'Akses Diterima' : 'Masukkan PIN Akses'}
            </h2>
          </div>

          {/* Roda Angka (Digital Tumbler) */}
          <div className="tumbler-container">
            {/* Center line for tumbler effect */}
            <div className="tumbler-line"></div>

            {digits.map((digit, idx) => (
              <div key={idx} className="digit-column">
                <button
                  type="button"
                  onClick={() => handleDigitChange(idx, 1)}
                  disabled={isUnlocked}
                  className="chevron-btn"
                  aria-label={`Increase digit ${idx + 1}`}
                >
                  <ChevronUp size={20} />
                </button>

                <div className="digit-box">
                  <span>{digit}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDigitChange(idx, -1)}
                  disabled={isUnlocked}
                  className="chevron-btn"
                  aria-label={`Decrease digit ${idx + 1}`}
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Pesan Kesalahan */}
          <div className="status-message">
            {isError ? (
              <p className="text-error">
                Kombinasi PIN Salah! Coba lagi.
              </p>
            ) : (
              <p className="text-target">
                Target: {TARGET_PIN.join('')}
              </p>
            )}
          </div>

          {/* Tombol Buka Gembok */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={isUnlocked}
            className={`action-btn ${isUnlocked ? 'unlocked' : 'locked'}`}
          >
            {isUnlocked ? (
              <>
                <CheckCircle2 size={20} />
                Terbuka!
              </>
            ) : (
              'Buka Gembok'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}