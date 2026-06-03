import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50 shadow-lg">
      <h1 className="text-3xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
        About <span className="text-orange-500">ShopIT</span>
      </h1>
      
      <div className="space-y-6 text-zinc-400 leading-relaxed">
        <p>
          Welcome to ShopIT, your number one source for premium lifestyle products. We're dedicated to giving you the very best shopping experience, with a focus on dependability, customer service, and uniqueness.
        </p>
        
        <h2 className="text-xl font-medium text-white mt-8 mb-3">Our Mission</h2>
        <p>
          Founded with a passion for quality and design, ShopIT has come a long way from its beginnings. When we first started out, our passion for helping people find top-tier products drove us to do intense research, and gave us the impetus to turn hard work and inspiration into a booming online store.
        </p>
        
        <h2 className="text-xl font-medium text-white mt-8 mb-3">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Carefully curated premium products</li>
          <li>Fast and reliable shipping worldwide</li>
          <li>Top-notch customer support ready to help 24/7</li>
          <li>Secure and seamless checkout experience</li>
        </ul>

        <p className="pt-4">
          We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  );
};

export default About;