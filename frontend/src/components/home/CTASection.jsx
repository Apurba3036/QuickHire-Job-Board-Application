import React from 'react';
import ctaImage from '../../assets/image.png';

export default function CTASection() {
    return (
        <section className="py-12 md:py-16 px-4 lg:px-12 bg-white">
            <div className="container mx-auto">
                <div
                    className="flex flex-col md:flex-row relative overflow-hidden min-h-[414px] md:h-[414px]"
                    style={{
                        background: '#4640DE',
                        clipPath: 'polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 48px 100%, 0 calc(100% - 48px))',
                    }}
                >
                    <div className="w-full md:w-[45%] px-8 md:pl-16 md:pr-8 py-12 md:py-0 flex flex-col justify-center z-10 text-white text-center md:text-left items-center md:items-start">
                        <h2 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 40px)', lineHeight: '120%', color: '#fff', marginBottom: '16px' }}>Start posting<br />jobs today</h2>
                        <p style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 400, fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>Start posting jobs for only $10.</p>
                        <button
                            className="hover:bg-gray-100 transition-colors shadow-lg"
                            style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 700, fontSize: '16px', background: '#fff', color: '#4640DE', border: 'none', padding: '14px 32px', borderRadius: '6px', width: 'max-content' }}
                        >
                            Sign Up For Free
                        </button>
                    </div>
                    <div className="w-full md:w-[55%] flex items-end justify-center md:justify-end md:absolute md:right-0 md:bottom-0">
                        <img src={ctaImage} alt="Dashboard preview" className="w-[90%] md:w-auto md:h-full object-contain object-bottom" />
                    </div>
                </div>
            </div>
        </section>
    );
}
