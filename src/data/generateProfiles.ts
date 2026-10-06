import { Profile } from './profiles'

const firstNames = {
  tamil: ['Priya', 'Karthik', 'Anjali', 'Ramesh', 'Deepa', 'Suresh', 'Lakshmi', 'Vijay', 'Priyanka', 'Arun'],
  telugu: ['Rajesh', 'Neha', 'Kiran', 'Sneha', 'Tarun', 'Pooja', 'Amit', 'Komal', 'Varun', 'Nandini'],
  malayalam: ['Aathma', 'Riju', 'Kavya', 'Dileep', 'Meera', 'Soumya', 'Anu', 'Vinesh', 'Divya', 'Ranjith'],
  kannada: ['Ramesh', 'Pooja', 'Kiran', 'Sneha', 'Tarun', 'Nandini', 'Anu', 'Vinesh', 'Divya', 'Ranjith'],
  hindi: ['Amit', 'Neha', 'Raj', 'Priya', 'Kumar', 'Sneha', 'Vijay', 'Anjali', 'Ramesh', 'Deepa']
}

const lastNames = {
  tamil: ['Iyer', 'Raj', 'Chandrasekhar', 'Krishnan', 'Pillai', 'Narayanan'],
  telugu: ['Reddy', 'Naidu', 'Raju', 'Chalam', 'Panda', 'Sarma'],
  malayalam: ['Menon', 'Varrier', 'Nair', 'Pillai', 'Kunju', 'Thampi'],
  kannada: ['Raju', 'Nayaka', 'Bhat', 'Sharma', 'Reddy', 'Kumar'],
  hindi: ['Sharma', 'Verma', 'Gupta', 'Jain', 'Patel', 'Kumar']
}

const religions = ['Hindu', 'Christian', 'Muslim', 'Sikh', 'Jain', 'Buddhist']
const castes = {
  Hindu: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra', 'Dalit'],
  Christian: ['Syrian', 'Latin', 'Mar Thoma', 'Anglican'],
  Muslim: ['Sunni', 'Shia'],
  Sikh: ['Jatt', 'Khatri', 'Arora'],
  Jain: ['Digambara', 'Svetambara'],
  Buddhist: ['Theravada', 'Mahayana']
}
const communities = ['Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Marathi', 'Gujarati', 'Punjabi', 'Bengali', 'Odia']
const occupations = ['Engineer', 'Doctor', 'Teacher', 'Entrepreneur', 'Consultant', 'Accountant', 'Manager', 'CA', 'Lawyer', 'Architect', 'Scientist', 'Pilot', 'Professor', 'Business Owner', 'Government Employee']

const countries = ['India', 'USA', 'UK', 'UAE', 'Singapore', 'Canada', 'Australia', 'Germany', 'Canada', 'Saudi Arabia']
const cities = {
  India: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', ' Lucknow'],
  USA: ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Houston', 'Austin', 'Seattle', 'Boston', 'Miami', 'Denver'],
  UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow', 'Leeds', 'Brighton', 'Bristol', 'Liverpool', 'Nottingham'],
  UAE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Fujairah', 'Ras Al Khaimah', 'Ard Al Jazeefah', 'Um Al Quwain'],
  Singapore: ['Singapore'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Toronto'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra'],
  Germany: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart'],
  Saudi: ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Mecca', 'Medina']
}

const educationLevels = ['12th Pass', 'Diploma', 'Bachelor\'s', 'Master\'s', 'MBA', 'PhD', 'Professional Degree']
const incomes = ['Below 2 Lakhs', '2-5 Lakhs', '5-10 Lakhs', '10-20 Lakhs', '20-40 Lakhs', 'Above 40 Lakhs', 'USD 30K-60K', 'USD 60K-100K', 'USD 100K+']

export function generateProfiles(): Profile[] {
  const profiles: Profile[] = []
  
  for (let i = 0; i < 100; i++) {
    const languageKey = Object.keys(firstNames)[i % Object.keys(firstNames).length] as keyof typeof firstNames
    const firstName = firstNames[languageKey][Math.floor(Math.random() * firstNames[languageKey].length)]
    const lastName = lastNames[languageKey][Math.floor(Math.random() * lastNames[languageKey].length)]
    const isNRI = Math.random() > 0.6
    const religion: 'Hindu' | 'Christian' | 'Muslim' | 'Sikh' | 'Jain' | 'Buddhist' = religions[Math.floor(Math.random() * religions.length)]
    const community = communities[Math.floor(Math.random() * communities.length)]
    
    const profile: Profile = {
      id: `profile-${i + 1}`,
      name: `${firstName} ${lastName}`,
      gender: i % 2 === 0 ? 'female' : 'male',
      age: 22 + Math.floor(Math.random() * 18),
      height: 145 + Math.floor(Math.random() * 50),
      weight: 45 + Math.floor(Math.random() * 35),
      maritalStatus: 'never',
      motherTongue: languageKey,
      religion,
      caste: castes[religion][Math.floor(Math.random() * castes[religion].length)],
      subCaste: `${castes[religion][Math.floor(Math.random() * castes[religion].length)]} Sub-Caste`,
      community,
      location: {
        currentCity: cities['India'][Math.floor(Math.random() * cities['India'].length)],
        hometown: cities['India'][Math.floor(Math.random() * cities['India'].length)],
        country: isNRI ? countries[Math.floor(Math.random() * (countries.length - 6))] : 'India',
        state: 'Tamil Nadu',
        citizenship: isNRI ? countries[Math.floor(Math.random() * (countries.length - 6))] : 'Indian'
      },
      career: {
        education: educationLevels[Math.floor(Math.random() * educationLevels.length)],
        college: 'University Degree',
        occupation: occupations[Math.floor(Math.random() * occupations.length)],
        company: isNRI ? 'Multinational Corp' : 'Local Company',
        income: incomes[Math.floor(Math.random() * incomes.length)],
        workLocation: isNRI ? countries[Math.floor(Math.random() * (countries.length - 6))] : cities['India'][Math.floor(Math.random() * cities['India'].length)]
      },
      lifestyle: {
        diet: ['veg', 'non-veg', 'jain'][Math.floor(Math.random() * 3)] as any,
        smoking: ['never', 'occasional', 'regular'][Math.floor(Math.random() * 3)] as any,
        drinking: ['never', 'occasional', 'regular'][Math.floor(Math.random() * 3)] as any
      },
      family: {
        fatherOccupation: occupations[Math.floor(Math.random() * occupations.length)],
        motherOccupation: occupations[Math.floor(Math.random() * occupations.length)],
        siblings: [],
        familyIncome: incomes[Math.floor(Math.random() * incomes.length)],
        familyType: ['nuclear', 'joint'][Math.floor(Math.random() * 2)] as any,
        familyValues: ['traditional', 'modern', 'liberal'][Math.floor(Math.random() * 3)] as any,
        familyLocation: cities['India'][Math.floor(Math.random() * cities['India'].length)],
        nativePlace: cities['India'][Math.floor(Math.random() * cities['India'].length)],
        familyBackground: 'Middle Class',
        familyExpectations: 'Looking for a compatible match'
      },
      partnerPreferences: {
        ageRange: [20 + Math.floor(Math.random() * 5), 35 + Math.floor(Math.random() * 10)],
        heightRange: [140 + Math.floor(Math.random() * 20), 170 + Math.floor(Math.random() * 30)],
        religion: 'Any',
        caste: 'Any',
        motherTongue: 'Any',
        education: 'Any',
        occupation: 'Any',
        income: 'Any',
        location: 'Any',
        country: isNRI ? 'Preferred: USA, UK, UAE, Canada, Australia' : 'Preferred: India',
        maritalStatus: 'Never',
        diet: 'Any',
        smoking: 'Any',
        drinking: 'Any',
        children: 'any',
        familyType: 'Any',
        familyValues: 'Any',
        disabilityAcceptable: Math.random() > 0.3,
        manglik: false
      },
      photos: [
        {
          url: `https://api.pravatar.cc/300?img=${Math.floor(Math.random() * 100)}`,
          isPrimary: true,
          visibility: 'everyone',
          isVerified: Math.random() > 0.5
        }
      ],
      horoscope: {
        dateOfBirth: `1990-05-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        timeOfBirth: `${10 + Math.floor(Math.random() * 8)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        placeOfBirth: 'Chennai, India',
        rasi: ['Mesha', 'Rishabha', 'Mithuna', 'Karkataka', 'Simha', 'Kanya', 'Tula', 'Vrishabha', 'Dhanus', 'Makara', 'Kumbha', 'Meena'][Math.floor(Math.random() * 12)] as string,
        nakshatra: ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanus', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(Math.random() * 27)] as string,
        lagnam: ['Mesha', 'Rishabha', 'Mithuna', 'Karkataka', 'Simha', 'Kanya', 'Tula', 'Vrishabha', 'Dhanus', 'Makara', 'Kumbha', 'Meena'][Math.floor(Math.random() * 12)] as string,
        gothram: `Gana ${Math.floor(Math.random() * 100)}`,
        dosham: Math.random() > 0.7 ? 'Pitra Dosham' : 'None',
        manglik: Math.random() > 0.8
      },
      verification: {
        mobile: true,
        email: true,
        photo: 'verified',
        govId: Math.random() > 0.5 ? 'verified' : 'pending',
        aadhaar: 'not_started',
        pan: 'not_started',
        video: Math.random() > 0.7 ? 'verified' : 'pending',
        education: 'not_started',
        employment: 'verified',
        trustScore: 75 + Math.floor(Math.random() * 20)
      },
      online: Math.random() > 0.7,
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 168) * 60000).toISOString(),
      interests: {
        received: [],
        sent: [],
        accepted: [],
        declined: []
      },
      shortlisted: [],
      chatContacts: [],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 86400000).toISOString(),
      profileCreatedBy: ['self', 'parent', 'sibling', 'friend', 'relative'][Math.floor(Math.random() * 5)] as any
    }

    profiles.push(profile)
  }

  return profiles
}