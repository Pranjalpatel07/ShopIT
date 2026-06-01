import React from 'react';
import { Link } from 'react-router-dom';

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50 shadow-lg">
      <h1 className="text-3xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
        Return & Refund <span className="text-orange-500">Policy</span>
      </h1>
      
      <div className="space-y-6 text-zinc-400 leading-relaxed">
        <p>
          Thank you for shopping at ShopNest. If you are not entirely satisfied with your purchase, we're here to help.
        </p>
        
        <h2 className="text-xl font-medium text-white mt-8 mb-3">Returns</h2>
        <p>
          You have <strong>30 calendar days</strong> to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging and needs to have the receipt or proof of purchase.
        </p>
        
        <h2 className="text-xl font-medium text-white mt-8 mb-3">Refunds</h2>
        <p>
          Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment).
        </p>

        <h2 className="text-xl font-medium text-white mt-8 mb-3">Shipping Returns</h2>
        <p>
          You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
        </p>

        <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-800 mt-8 text-center">
          <p className="text-zinc-300 mb-4">Have any Queary ? then mail us - ShopItTeam@gmail.com</p>
          
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;