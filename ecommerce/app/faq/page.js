// components/FAQ.js
import React from 'react';

const FAQ = () => {
  return (
    <div className='p-4'>
      <h1>Frequently Asked Questions</h1>
      <h2 className='font-bold'>1. What is KingsVillah?</h2>
      <p>KingsVillah is a clothing brand offering a wide range of fashionable apparel for men, women, and children. We focus on quality and style to provide our customers with the best clothing experience.</p>
      <h2 className='font-bold'>2. How can I place an order?</h2>
      <p>You can place an order directly on our website by selecting your desired products, adding them to your cart, and proceeding to checkout.</p>
      <h2 className='font-bold'>3. What payment methods do you accept?</h2>
      <p>We accept various payment methods including credit/debit cards and other secure online payment options. For more details, please check our payment options during checkout.</p>
      <h2 className='font-bold'>4. How can I track my order?</h2>
      <p>Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order status on our website.</p>
      <h2 className='font-bold'>5. Can I return or exchange items?</h2>
      <p>Yes, we offer returns and exchanges within [Insert Return Period, e.g., 30 days] of receiving your order. Please refer to our Return Policy for detailed instructions.</p>
      <h2 className='font-bold'>6. How can I contact customer support?</h2>
      <p>You can contact our customer support team via email at <a href="mailto:support@kingsvillah.com">support@kingsvillah.com</a> or call us at [Insert Phone Number]. We are here to help!</p>
      <h2 className='font-bold'>7. Do you offer international shipping?</h2>
      <p>Currently, we offer shipping to select countries. Please check our shipping policy for more details.</p>
      <h2 className='font-bold'>8. How do I subscribe to your newsletter?</h2>
      <p>You can subscribe to our newsletter by entering your email address in the subscription form located at the bottom of our homepage.</p>
    </div>
  );
};

export default FAQ;
