import React from 'react';

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50 shadow-lg">
      <h1 className="text-3xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
        Legal <span className="text-orange-500">Disclaimer</span>
      </h1>
      
      <div className="space-y-6 text-zinc-400 leading-relaxed">
        <p>
          The information contained on the ShopNest website (the "Service") is for general information purposes only. ShopNest assumes no responsibility for errors or omissions in the contents on the Service.
        </p>
        
        <h2 className="text-xl font-medium text-white mt-8 mb-3">Limitation of Liability</h2>
        <p>
          In no event shall ShopNest be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. ShopNest reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice.
        </p>
        
        <h2 className="text-xl font-medium text-white mt-8 mb-3">External Links Disclaimer</h2>
        <p>
          The ShopNest website may contain links to external websites that are not provided or maintained by or in any way affiliated with ShopNest. Please note that the ShopNest does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>

        <h2 className="text-xl font-medium text-white mt-8 mb-3">Product Accuracy</h2>
        <p>
          While we strive to ensure that product descriptions, images, and prices are accurate, errors may occur. We do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;