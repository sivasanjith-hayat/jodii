export const countries = [
  'India', 'USA', 'UK', 'UAE', 'Singapore', 'Canada', 'Australia', 'Germany', 'Saudi Arabia', 
  'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'South Africa', 'New Zealand', 'Japan', 'China'
]

export const states = {
  India: ['Tamil Nadu', 'Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Kerala', 
          'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Delhi', 'West Bengal'],
  USA: ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio'],
  UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah'],
  Australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia'],
  Canada: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
  Germany: ['Berlin', 'Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Hamburg'],
  Saudi: ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina']
}

export const cities = {
  India: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Kolkata', 'Pune', 
          'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Coimbatore', 'Madurai', 'Trivandrum'],
  USA: ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Houston', 'Austin', 
        'Seattle', 'Boston', 'Miami', 'Denver', 'Phoenix', 'Dallas', 'Atlanta'],
  UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow', 'Leeds', 'Brighton', 'Bristol'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah'],
  Singapore: ['Singapore'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  Germany: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart'],
  Saudi: ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina']
}

export const religionsData = {
  Hindu: {
    castes: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra', 'Dalit'],
    subCastes: {
      Brahmin: ['Iyer', 'Shaiva', 'Vaishnava', 'Smarta', 'Jyotish'],
      Kshatriya: ['Rajput', 'Kathia', 'Chauhan', 'Paramara'],
      Vaishya: ['Vaish', 'Bania', 'Patel', 'Jain'],
      Shudra: ['Reddy', 'Naidu', 'Kumhar', 'Meena']
    }
  },
  Christian: {
    castes: ['Syrian', 'Latin', 'Mar Thoma', 'Anglican', 'Jesuit'],
    subCastes: {
      Syrian: ['Syrian Jacobite', 'Syrian Orthodox', 'Mar Thoma'],
      Latin: ['Roman Catholic', 'Salesian', 'Jesuit']
    }
  },
  Muslim: {
    castes: ['Sunni', 'Shia', 'Sufi'],
    subCastes: {
      Sunni: ['Hanafi', 'Maliki', 'Shafi\'i', 'Hanbali'],
      Shia: ['Twelver Shia', 'Ismaili', 'Zaidi']
    }
  },
  Sikh: {
    castes: ['Jatt', 'Khatri', 'Arora', 'Brahmin', 'Saini'],
    subCastes: {
      Jatt: ['Sial', 'Walia', 'Chawla', 'Brar'],
      Khatri: ['Gill', 'Singh', 'Khan']
    }
  },
  Jain: {
    castes: ['Digambara', 'Svetambara'],
    subCastes: {
      Digambara: ['Digambara Sthanakavasi', 'Terapanth'],
      Svetambara: ['Svetambara Terapanth', 'Siddhachalam']
    }
  },
  Buddhist: {
    castes: ['Theravada', 'Mahayana', 'Vajrayana'],
    subCastes: {
      Theravada: ['Thai Forest', 'Burmese', 'Sri Lankan'],
      Mahayana: ['Chinese Mahayana', 'Tibetan']
    }
  }
}

export const communities = [
  { id: 'tamil', name: 'Tamil Nadu', description: 'Tamil Community Matrimony', heroImage: '/communities/tamil.jpg' },
  { id: 'telugu', name: 'Telugu', description: 'Telugu Community Matrimony', heroImage: '/communities/telugu.jpg' },
  { id: 'malayalam', name: 'Malayalam', description: 'Malayalam Community Matrimony', heroImage: '/communities/malayalam.jpg' },
  { id: 'kannada', name: 'Kannada', description: 'Kannada Community Matrimony', heroImage: '/communities/kannada.jpg' },
  { id: 'brahmin', name: 'Brahmin', description: 'Brahmin Community Matrimony', heroImage: '/communities/brahmin.jpg' },
  { id: 'chettiar', name: 'Chettiar', description: 'Chettiar Community Matrimony', heroImage: '/communities/chettiar.jpg' },
  { id: 'naidu', name: 'Naidu', description: 'Naidu Community Matrimony', heroImage: '/communities/naidu.jpg' },
  { id: 'reddy', name: 'Reddy', description: 'Reddy Community Matrimony', heroImage: '/communities/reddy.jpg' },
  { id: 'vanniyar', name: 'Vanniyar', description: 'Vanniyar Community Matrimony', heroImage: '/communities/vanniyar.jpg' },
  { id: 'mudaliar', name: 'Mudaliar', description: 'Mudaliar Community Matrimony', heroImage: '/communities/mudaliar.jpg' },
  { id: 'nadar', name: 'Nadar', description: 'Nadar Community Matrimony', heroImage: '/communities/nadar.jpg' },
  { id: 'gounder', name: 'Gounder', description: 'Gounder Community Matrimony', heroImage: '/communities/gounder.jpg' },
  { id: 'maratha', name: 'Maratha', description: 'Maratha Community Matrimony', heroImage: '/communities/maratha.jpg' },
  { id: 'rajput', name: 'Rajput', description: 'Rajput Community Matrimony', heroImage: '/communities/rajput.jpg' },
  { id: 'jain', name: 'Jain', description: 'Jain Community Matrimony', heroImage: '/communities/jain.jpg' },
  { id: 'sikh', name: 'Sikh', description: 'Sikh Community Matrimony', heroImage: '/communities/sikh.jpg' },
  { id: 'muslim', name: 'Muslim', description: 'Muslim Community Matrimony', heroImage: '/communities/muslim.jpg' },
  { id: 'christian', name: 'Christian', description: 'Christian Community Matrimony', heroImage: '/communities/christian.jpg' }
]

export const incomeBands = [
  'Below 2 Lakhs/year',
  '2-5 Lakhs/year',
  '5-10 Lakhs/year',
  '10-20 Lakhs/year',
  '20-40 Lakhs/year',
  'Above 40 Lakhs/year'
]

export const incomeBandsInternational = [
  'USD 30K-60K',
  'USD 60K-100K',
  'USD 100K-150K',
  'USD 150K+'
]

export const educationLevels = [
  '12th Pass',
  'Diploma',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'MBA/PGDM',
  'PhD',
  'Professional Degree (CA, CS, LLM, Medical)'
]

export const occupations = [
  'Engineer', 'Doctor', 'Teacher', 'Entrepreneur', 'Consultant',
  'Accountant', 'Manager', 'Chartered Accountant', 'Lawyer', 'Architect',
  'Scientist', 'Pilot', 'Professor', 'Business Owner', 'Government Employee',
  'Software Developer', 'Data Scientist', 'Designer', 'Marketing Professional',
  'Banker', 'Insurance Professional', 'Real Estate', 'Tourism', 'Media',
  'NRI Professional', 'Freelancer', 'Trader', 'Investor'
]

export const familyTypes = ['Nuclear', 'Joint Family', 'Extended Family']

export const familyValueSystems = ['Traditional', 'Modern', 'Liberal']

export const dietaryPreferences = ['Vegetarian', 'Non-Vegetarian', 'Jain', 'Other']

export const lifestyleChoices = ['Smoking Non-Preferant', 'Occasional Smoker', 'Regular Smoker', 
                                  'Non-Drinker', 'Social Drinker', 'Regular Drinker']

export const nakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanus',
  'Sagittarius', 'Capricorn', ' Aquarius', 'Pisces'
]

export const rasis = [
  'Mesha (Aries)', 'Rishabha (Taurus)', 'Mithuna (Gemini)', 'Karkataka (Cancer)',
  'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishabha (Scorpio)',
  'Dhanus (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
]

export const poruthamNames = [
  'Dina Porutham', 'Gana Porutham', 'Mahendra Porutham',
  'Stree Deergha Porutham', 'Yoni Porutham', 'Rasi Porutham',
  'Rasiyathipathi Porutham', 'Vasya Porutham', 'Rajju Porutham', 'Vedha Porutham'
]

export const manglikDoshaInfo = {
  male: 'Manglik dosha occurs when Mars is placed in specific positions...',
  female: 'Manglik dosha for females is generally considered favorable...'
}

export const successStoryStatuses = ['pending', 'published', 'rejected']

export const reportReasons = [
  'Fake Profile', 'Scam/Spam', 'Inappropriate Content', 'Harassment',
  'Misleading Information', 'Other'
]

export const verificationStatuses = ['not_started', 'pending', 'verified', 'rejected']

export const supportTicketStatuses = ['open', 'in_progress', 'resolved', 'closed']

export const notificationTypes = [
  'new_interest', 'interest_accepted', 'new_message', 'profile_viewed',
  'shortlisted', 'photo_request', 'contact_request', 'match_recommendation',
  'verification_status', 'safety_alert'
]