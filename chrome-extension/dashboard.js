const DEFAULT_GROUPS = [
  {
    id: "g1",
    name: "Indians in Dallas/Fort Worth",
    url: "https://www.facebook.com/groups/146104119060597",
    city: "Dallas/Fort Worth",
    audience: "Community",
    selected: true
  },
  {
    id: "g2",
    name: "Punjabis in Dallas",
    url: "https://www.facebook.com/groups/1983005668510281",
    city: "Dallas",
    audience: "Community",
    selected: true
  },
  {
    id: "g3",
    name: "Frisco Desis",
    url: "https://www.facebook.com/groups/402946181962616",
    city: "Frisco",
    audience: "Community",
    selected: true
  },
  {
    id: "g4",
    name: "Desis in Frisco, Celina, Plano...",
    url: "https://www.facebook.com/groups/498850401892441",
    city: "Frisco / Plano",
    audience: "Community",
    selected: true
  },
  {
    id: "g5",
    name: "Allen Plano McKinney Desis",
    url: "https://www.facebook.com/groups/1438402670290014",
    city: "Allen / Plano / McKinney",
    audience: "Community",
    selected: true
  }
];

const BUSINESS_TYPE_TEMPLATES = {
  "Tutor": [
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Parent groups are the #1 source of tutoring referrals — parents ask each other for recommendations constantly." },
    { id: "students", name: "{location} Students & Study Groups", audience: "Students", why: "Students actively look for peer tutors and affordable test prep in local study groups." },
    { id: "education", name: "{location} Education & Schools", audience: "Families", why: "School-adjacent groups are highly relevant for academic support and enrichment services." },
    { id: "moms", name: "{location} Moms Group", audience: "Moms", why: "Moms groups drive a huge share of recommendations for tutors, especially for younger kids." }
  ],
  "Test Prep": [
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Parents of high schoolers are actively searching for SAT/ACT prep and college counseling." },
    { id: "high-school", name: "{location} High School Parents", audience: "Parents", why: "High school parent groups are directly in the test-prep decision window." },
    { id: "students", name: "{location} Students & Study Groups", audience: "Students", why: "Students discuss test prep, share resources, and look for tutors in these groups." },
    { id: "education", name: "{location} Education Community", audience: "Families", why: "Education-focused groups attract the families most likely to invest in test prep." }
  ],
  "College Counseling": [
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Parents of juniors and seniors are constantly seeking college admissions guidance." },
    { id: "high-school", name: "{location} High School Parents", audience: "Parents", why: "High school parent groups are the most direct channel for college counseling services." },
    { id: "education", name: "{location} Education Community", audience: "Families", why: "Education groups attract families already invested in their kids' academic futures." },
    { id: "moms", name: "{location} Moms Group", audience: "Moms", why: "Word-of-mouth in moms groups drives a large share of college counselor referrals." }
  ],
  "Music Lessons": [
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Parents looking for music lessons for their kids ask each other in parent groups first." },
    { id: "events-classes", name: "{location} Community Events & Classes", audience: "Families", why: "Events and classes groups are a natural fit for music lessons, recitals, and workshops." },
    { id: "arts", name: "{location} Arts & Music Community", audience: "Music lovers", why: "Arts communities include adult learners and families who value music education." },
    { id: "moms", name: "{location} Moms Group", audience: "Moms", why: "Moms groups are active sources of referrals for children's enrichment activities." }
  ],
  "Dance / Fitness Instructor": [
    { id: "fitness", name: "{location} Fitness & Wellness Group", audience: "Health-conscious residents", why: "Fitness groups are full of people actively looking for classes, instructors, and workout options." },
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Parents enroll kids in dance and fitness classes through trusted parent recommendations." },
    { id: "events-classes", name: "{location} Community Events & Classes", audience: "Families", why: "Class-based offers fit naturally in events and community classes groups." },
    { id: "women", name: "{location} Women's Community", audience: "Women", why: "Women's groups are one of the strongest channels for fitness and dance class referrals." }
  ],
  "Childcare": [
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Childcare is one of the top things parents ask each other about — trust is everything." },
    { id: "moms", name: "{location} Moms Group", audience: "Moms", why: "Moms groups are the primary word-of-mouth channel for daycare, babysitters, and nannies." },
    { id: "family", name: "{location} Family Network", audience: "Families", why: "Family-focused groups reach parents who need childcare recommendations right now." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Neighbors", why: "Neighborhood groups are key for local childcare providers who serve a specific area." }
  ],
  "Small Business": [
    { id: "small-business", name: "{location} Small Business Community", audience: "Business owners", why: "Other small business owners refer each other, collaborate, and are your most understanding audience." },
    { id: "entrepreneurs", name: "{location} Entrepreneurs & Startups", audience: "Entrepreneurs", why: "Entrepreneur groups are open to new services, tools, and business-to-business offers." },
    { id: "marketplace", name: "{location} Local Marketplace", audience: "Local buyers", why: "Marketplace groups are the fastest way to reach customers who are ready to buy." },
    { id: "community", name: "{location} Community Network", audience: "Local residents", why: "Community groups build local brand awareness and trust for new small businesses." }
  ],
  "Home Service": [
    { id: "home-services", name: "{location} Home Services & Repairs", audience: "Homeowners", why: "Homeowners actively ask for trusted service providers in home-focused groups." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Neighbors", why: "Neighborhood groups are where homeowners ask for contractor and service recommendations." },
    { id: "homeowners", name: "{location} Homeowners Group", audience: "Homeowners", why: "Homeowner groups are the most targeted audience for any home-related service offer." },
    { id: "marketplace", name: "{location} Local Marketplace", audience: "Local buyers", why: "Local marketplace groups reach people actively looking for deals and services near them." }
  ],
  "Cleaning Service": [
    { id: "homeowners", name: "{location} Homeowners Group", audience: "Homeowners", why: "Homeowners are the direct customer for cleaning services and trust peer recommendations." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Neighbors", why: "Neighbors ask for cleaning service referrals constantly in local community groups." },
    { id: "moms", name: "{location} Moms Group", audience: "Moms", why: "Busy moms are a top demographic for cleaning services and share providers in their groups." },
    { id: "marketplace", name: "{location} Local Marketplace", audience: "Local buyers", why: "Marketplace groups work well for promotions, new client specials, and availability posts." }
  ],
  "Real Estate": [
    { id: "real-estate", name: "{location} Real Estate Investors & Buyers", audience: "Buyers and investors", why: "Real estate groups are full of people actively in the buying, selling, or investing process." },
    { id: "homeowners", name: "{location} Homeowners Group", audience: "Homeowners", why: "Homeowners thinking about selling often look for agents in trusted homeowner communities." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Neighbors", why: "Neighborhood groups are where people ask for agent recommendations when buying locally." },
    { id: "small-business", name: "{location} Small Business & Professionals", audience: "Professionals", why: "Professional networks lead to investor referrals and commercial real estate opportunities." }
  ],
  "Mortgage / Insurance": [
    { id: "homeowners", name: "{location} Homeowners Group", audience: "Homeowners", why: "Homeowners are constantly refinancing, switching insurance, and asking each other for referrals." },
    { id: "real-estate", name: "{location} Real Estate & Home Buyers", audience: "Buyers", why: "First-time buyers and investors actively need mortgage guidance at the moment of purchase." },
    { id: "small-business", name: "{location} Small Business Community", audience: "Business owners", why: "Business owners need commercial insurance and may be looking for financial partners." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Neighbors", why: "Neighborhood groups are where people ask for trusted insurance and mortgage referrals." }
  ],
  "Restaurant / Catering": [
    { id: "foodies", name: "{location} Foodies & Dining", audience: "Food lovers", why: "Food groups are the most targeted channel for restaurants, pop-ups, and catering offers." },
    { id: "marketplace", name: "{location} Local Marketplace", audience: "Local buyers", why: "Marketplace groups work well for catering promos, meal deals, and event packages." },
    { id: "events", name: "{location} Events & Entertainment", audience: "Event planners", why: "Event groups are a direct channel for catering — people planning events are already looking." },
    { id: "community", name: "{location} Community Network", audience: "Local residents", why: "Community groups build restaurant awareness and word-of-mouth in your neighborhood." }
  ],
  "Beauty / Wellness": [
    { id: "women", name: "{location} Women's Community", audience: "Women", why: "Women's groups are the strongest channel for beauty, skincare, and wellness referrals." },
    { id: "wellness", name: "{location} Health & Wellness", audience: "Health-conscious residents", why: "Wellness groups attract the exact demographic looking for beauty and self-care services." },
    { id: "recommendations", name: "{location} Local Recommendations", audience: "Local residents", why: "Recommendation groups are where people ask for trusted hair, skin, and wellness providers." },
    { id: "moms", name: "{location} Moms Group", audience: "Moms", why: "Moms groups are active referral networks for beauty and wellness services." }
  ],
  "Photography": [
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Parents are a top client segment for family portraits, newborn shoots, and school events." },
    { id: "events", name: "{location} Events & Weddings", audience: "Event planners", why: "People planning weddings and events are actively searching for photographers in local groups." },
    { id: "recommendations", name: "{location} Local Recommendations", audience: "Local residents", why: "Photo clients almost always come from word-of-mouth — recommendation groups help seed that." },
    { id: "women", name: "{location} Women's Community", audience: "Women", why: "Women's groups drive strong referrals for portrait, branding, and lifestyle photography." }
  ],
  "Event Planning": [
    { id: "events", name: "{location} Events & Entertainment", audience: "Event planners", why: "Event groups are where people go first when planning a party, wedding, or corporate event." },
    { id: "weddings", name: "{location} Weddings & Celebrations", audience: "Couples and families", why: "Wedding groups are a direct channel for event planners targeting milestone celebrations." },
    { id: "moms", name: "{location} Moms Group", audience: "Moms", why: "Moms plan kids' parties, school events, and family gatherings — a strong client base." },
    { id: "community", name: "{location} Community Network", audience: "Local residents", why: "Community groups help event planners build local visibility and get referrals." }
  ],
  "Retail / Boutique": [
    { id: "marketplace", name: "{location} Local Marketplace", audience: "Local buyers", why: "Marketplace groups are the fastest way to reach people ready to shop locally." },
    { id: "women", name: "{location} Women's Community", audience: "Women", why: "Women's groups are a top channel for boutique fashion, accessories, and lifestyle retail." },
    { id: "deals", name: "{location} Deals & Shopping", audience: "Shoppers", why: "Deals groups attract people actively looking for local shopping finds and sales." },
    { id: "community", name: "{location} Community Network", audience: "Local residents", why: "Community groups build brand awareness and loyalty for new local retail businesses." }
  ],
  "Healthcare / Clinic": [
    { id: "recommendations", name: "{location} Local Recommendations", audience: "Local residents", why: "Healthcare decisions are trust-based — recommendation groups are where people ask and listen." },
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Parents are the primary healthcare decision-makers for their families and ask each other constantly." },
    { id: "wellness", name: "{location} Health & Wellness", audience: "Health-conscious residents", why: "Wellness groups attract health-aware people who are open to new clinics and practitioners." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Neighbors", why: "Neighborhood groups help local clinics build trusted visibility in their immediate service area." }
  ],
  "Professional Services": [
    { id: "small-business", name: "{location} Small Business Community", audience: "Business owners", why: "Small business owners are the primary buyers of legal, accounting, HR, and consulting services." },
    { id: "entrepreneurs", name: "{location} Entrepreneurs & Startups", audience: "Entrepreneurs", why: "Startup communities need professional services and trust peer recommendations for providers." },
    { id: "professionals", name: "{location} Professionals Network", audience: "Professionals", why: "Professional networks are the right audience for B2B and high-trust service providers." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Local residents", why: "Local residents refer professional service providers in community groups regularly." }
  ],
  "B2B": [
    { id: "small-business", name: "{location} Small Business Community", audience: "Business owners", why: "Small business owners are your most direct B2B audience and trust group referrals." },
    { id: "entrepreneurs", name: "{location} Entrepreneurs & Startups", audience: "Entrepreneurs", why: "Startup founders actively seek tools, services, and vendors in entrepreneur communities." },
    { id: "professionals", name: "{location} Professionals Network", audience: "Professionals", why: "Professional networks are where decision-makers and buyers are active." },
    { id: "chamber", name: "{location} Business Network & Chamber", audience: "Business owners", why: "Chamber-style groups attract business owners who are open to new vendor relationships." }
  ],
  "Nonprofit / Community": [
    { id: "community", name: "{location} Community Network", audience: "Community members", why: "Community groups are the most direct channel for nonprofits and civic organizations." },
    { id: "volunteers", name: "{location} Volunteers & Giving", audience: "Volunteers", why: "Volunteer groups attract people who are already aligned with nonprofit missions." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Neighbors", why: "Neighborhood groups help nonprofits reach people geographically close to their programs." },
    { id: "parents", name: "{location} Parents Network", audience: "Parents", why: "Parent groups are active in school, youth, and family-focused nonprofit causes." }
  ],
  "Other Service": [
    { id: "community", name: "{location} Community Network", audience: "Local residents", why: "Community groups are a reliable starting point for any local service offer." },
    { id: "marketplace", name: "{location} Local Marketplace", audience: "Local buyers", why: "Marketplace groups reach people who are actively looking for local services." },
    { id: "neighborhood", name: "{location} Neighborhood Community", audience: "Neighbors", why: "Neighborhood groups build local trust and word-of-mouth for service providers." },
    { id: "recommendations", name: "{location} Local Recommendations", audience: "Local residents", why: "Recommendation groups are where people ask for trusted service providers by category." }
  ]
};

const BUSINESS_TYPES = [
  "Tutor",
  "Test Prep",
  "College Counseling",
  "Music Lessons",
  "Dance / Fitness Instructor",
  "Childcare",
  "Small Business",
  "Home Service",
  "Cleaning Service",
  "Real Estate",
  "Mortgage / Insurance",
  "Restaurant / Catering",
  "Beauty / Wellness",
  "Photography",
  "Event Planning",
  "Retail / Boutique",
  "Healthcare / Clinic",
  "Professional Services",
  "B2B",
  "Nonprofit / Community",
  "Other Service"
];

const LOCATION_OPTIONS = [
  "Anchorage, Alaska, United States",
  "Birmingham, Alabama, United States",
  "Huntsville, Alabama, United States",
  "Mobile, Alabama, United States",
  "Montgomery, Alabama, United States",
  "Fayetteville, Arkansas, United States",
  "Little Rock, Arkansas, United States",
  "Phoenix, Arizona, United States",
  "Scottsdale, Arizona, United States",
  "Tempe, Arizona, United States",
  "Tucson, Arizona, United States",
  "Anaheim, California, United States",
  "Bakersfield, California, United States",
  "Fresno, California, United States",
  "Irvine, California, United States",
  "Long Beach, California, United States",
  "Los Angeles, California, United States",
  "Oakland, California, United States",
  "Palo Alto, California, United States",
  "Sacramento, California, United States",
  "San Diego, California, United States",
  "San Francisco, California, United States",
  "San Jose, California, United States",
  "Santa Clara, California, United States",
  "Santa Monica, California, United States",
  "Boulder, Colorado, United States",
  "Colorado Springs, Colorado, United States",
  "Denver, Colorado, United States",
  "Fort Collins, Colorado, United States",
  "Bridgeport, Connecticut, United States",
  "Hartford, Connecticut, United States",
  "New Haven, Connecticut, United States",
  "Stamford, Connecticut, United States",
  "Washington, District of Columbia, United States",
  "Dover, Delaware, United States",
  "Wilmington, Delaware, United States",
  "Fort Lauderdale, Florida, United States",
  "Jacksonville, Florida, United States",
  "Miami, Florida, United States",
  "Orlando, Florida, United States",
  "St. Petersburg, Florida, United States",
  "Tallahassee, Florida, United States",
  "Tampa, Florida, United States",
  "Athens, Georgia, United States",
  "Atlanta, Georgia, United States",
  "Augusta, Georgia, United States",
  "Savannah, Georgia, United States",
  "Honolulu, Hawaii, United States",
  "Ames, Iowa, United States",
  "Cedar Rapids, Iowa, United States",
  "Des Moines, Iowa, United States",
  "Iowa City, Iowa, United States",
  "Boise, Idaho, United States",
  "Idaho Falls, Idaho, United States",
  "Aurora, Illinois, United States",
  "Champaign, Illinois, United States",
  "Chicago, Illinois, United States",
  "Naperville, Illinois, United States",
  "Peoria, Illinois, United States",
  "Springfield, Illinois, United States",
  "Bloomington, Indiana, United States",
  "Fort Wayne, Indiana, United States",
  "Indianapolis, Indiana, United States",
  "South Bend, Indiana, United States",
  "Kansas City, Kansas, United States",
  "Lawrence, Kansas, United States",
  "Overland Park, Kansas, United States",
  "Topeka, Kansas, United States",
  "Wichita, Kansas, United States",
  "Bowling Green, Kentucky, United States",
  "Lexington, Kentucky, United States",
  "Louisville, Kentucky, United States",
  "Baton Rouge, Louisiana, United States",
  "Lafayette, Louisiana, United States",
  "New Orleans, Louisiana, United States",
  "Shreveport, Louisiana, United States",
  "Boston, Massachusetts, United States",
  "Cambridge, Massachusetts, United States",
  "Somerville, Massachusetts, United States",
  "Worcester, Massachusetts, United States",
  "Annapolis, Maryland, United States",
  "Baltimore, Maryland, United States",
  "Bethesda, Maryland, United States",
  "Rockville, Maryland, United States",
  "Portland, Maine, United States",
  "Ann Arbor, Michigan, United States",
  "Detroit, Michigan, United States",
  "Grand Rapids, Michigan, United States",
  "Lansing, Michigan, United States",
  "Minneapolis, Minnesota, United States",
  "Rochester, Minnesota, United States",
  "St. Paul, Minnesota, United States",
  "Columbia, Missouri, United States",
  "Kansas City, Missouri, United States",
  "St. Louis, Missouri, United States",
  "Springfield, Missouri, United States",
  "Jackson, Mississippi, United States",
  "Billings, Montana, United States",
  "Missoula, Montana, United States",
  "Asheville, North Carolina, United States",
  "Charlotte, North Carolina, United States",
  "Durham, North Carolina, United States",
  "Greensboro, North Carolina, United States",
  "Raleigh, North Carolina, United States",
  "Wilmington, North Carolina, United States",
  "Fargo, North Dakota, United States",
  "Lincoln, Nebraska, United States",
  "Omaha, Nebraska, United States",
  "Manchester, New Hampshire, United States",
  "Concord, New Hampshire, United States",
  "Hoboken, New Jersey, United States",
  "Jersey City, New Jersey, United States",
  "Newark, New Jersey, United States",
  "Princeton, New Jersey, United States",
  "Albuquerque, New Mexico, United States",
  "Santa Fe, New Mexico, United States",
  "Henderson, Nevada, United States",
  "Las Vegas, Nevada, United States",
  "Reno, Nevada, United States",
  "Albany, New York, United States",
  "Buffalo, New York, United States",
  "New York City, New York, United States",
  "Rochester, New York, United States",
  "Syracuse, New York, United States",
  "Cincinnati, Ohio, United States",
  "Cleveland, Ohio, United States",
  "Columbus, Ohio, United States",
  "Dayton, Ohio, United States",
  "Toledo, Ohio, United States",
  "Norman, Oklahoma, United States",
  "Oklahoma City, Oklahoma, United States",
  "Tulsa, Oklahoma, United States",
  "Bend, Oregon, United States",
  "Eugene, Oregon, United States",
  "Portland, Oregon, United States",
  "Salem, Oregon, United States",
  "Allentown, Pennsylvania, United States",
  "Harrisburg, Pennsylvania, United States",
  "Philadelphia, Pennsylvania, United States",
  "Pittsburgh, Pennsylvania, United States",
  "Providence, Rhode Island, United States",
  "Charleston, South Carolina, United States",
  "Columbia, South Carolina, United States",
  "Greenville, South Carolina, United States",
  "Sioux Falls, South Dakota, United States",
  "Chattanooga, Tennessee, United States",
  "Knoxville, Tennessee, United States",
  "Memphis, Tennessee, United States",
  "Nashville, Tennessee, United States",
  "Austin, Texas, United States",
  "Dallas, Texas, United States",
  "Denton, Texas, United States",
  "El Paso, Texas, United States",
  "Fort Worth, Texas, United States",
  "Frisco, Texas, United States",
  "Houston, Texas, United States",
  "Irving, Texas, United States",
  "McKinney, Texas, United States",
  "Plano, Texas, United States",
  "San Antonio, Texas, United States",
  "Waco, Texas, United States",
  "Logan, Utah, United States",
  "Ogden, Utah, United States",
  "Provo, Utah, United States",
  "Salt Lake City, Utah, United States",
  "Alexandria, Virginia, United States",
  "Arlington, Virginia, United States",
  "Charlottesville, Virginia, United States",
  "Richmond, Virginia, United States",
  "Virginia Beach, Virginia, United States",
  "Burlington, Vermont, United States",
  "Bellevue, Washington, United States",
  "Olympia, Washington, United States",
  "Seattle, Washington, United States",
  "Spokane, Washington, United States",
  "Tacoma, Washington, United States",
  "Green Bay, Wisconsin, United States",
  "Madison, Wisconsin, United States",
  "Milwaukee, Wisconsin, United States",
  "Charleston, West Virginia, United States",
  "Morgantown, West Virginia, United States",
  "Cheyenne, Wyoming, United States",
  "Toronto, Ontario, Canada",
  "Mississauga, Ontario, Canada",
  "Brampton, Ontario, Canada",
  "Ottawa, Ontario, Canada",
  "Vancouver, British Columbia, Canada",
  "Surrey, British Columbia, Canada",
  "Calgary, Alberta, Canada",
  "Edmonton, Alberta, Canada",
  "Montreal, Quebec, Canada",
  "Quebec City, Quebec, Canada",
  "Winnipeg, Manitoba, Canada",
  "Halifax, Nova Scotia, Canada",
  "London, England, United Kingdom",
  "Birmingham, England, United Kingdom",
  "Manchester, England, United Kingdom",
  "Leeds, England, United Kingdom",
  "Liverpool, England, United Kingdom",
  "Bristol, England, United Kingdom",
  "Cambridge, England, United Kingdom",
  "Oxford, England, United Kingdom",
  "Edinburgh, Scotland, United Kingdom",
  "Glasgow, Scotland, United Kingdom",
  "Cardiff, Wales, United Kingdom",
  "Belfast, Northern Ireland, United Kingdom"
];

// Add your own email here to keep pro access permanently
const PRO_EMAILS = [
  "noorps006@gmail.com"
];

const FREE_GROUP_LIMIT = 4;

function getUserPlan(email) {
  return PRO_EMAILS.includes((email || "").toLowerCase().trim()) ? "pro" : "free";
}

const app = document.getElementById("app");
let state = {
  user: null,
  groups: [],
  variants: [],
  activeView: "home",
  authMode: "signup",
  authNotice: "",
  recoverySession: null,
  filter: "",
  lookupResults: {},
  loadingLookupId: null,
  recommendationNotice: "",
  searchQuery: "",
  searchResults: null,
  searchLoading: false,
  savedCandidateUrls: new Set()
};

function chromeGet(keys) {
  return new Promise(resolve => chrome.storage.local.get(keys, resolve));
}

function chromeSet(data) {
  return new Promise(resolve => chrome.storage.local.set(data, resolve));
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function facebookGroupSearchUrl(group) {
  const query = encodeURIComponent(`${group.name} ${group.city || ""} Facebook group`);
  return `https://www.facebook.com/search/groups?q=${query}`;
}

function sendMessage(message) {
  return new Promise(resolve => chrome.runtime.sendMessage(message, resolve));
}

function getUserLocation() {
  return (state.user?.location || "your area").trim();
}

function getRecommendedGroups() {
  const location = getUserLocation();
  const businessType = state.user?.businessType || "Other Service";

  let templates;
  if (BUSINESS_TYPE_TEMPLATES[businessType]) {
    templates = BUSINESS_TYPE_TEMPLATES[businessType];
  } else if (/(lacrosse|soccer|basketball|baseball|football|volleyball|tennis|coach|sports?|athletic|training)/i.test(businessType)) {
    templates = [
      { id: "youth-sports", name: "{location} Youth Sports Parents", audience: "Sports families", why: `Parents looking for ${businessType.toLowerCase()} support are active in youth sports and family groups.` },
      { id: "sport-specific", name: `{location} ${businessType} Community`, audience: "Players and parents", why: "Sport communities are better for coaching, camps, clinics, and team-adjacent offers." },
      { id: "moms-parents", name: "{location} Moms and Parents", audience: "Parents", why: "Parent groups are useful for lessons, camps, and private coaching recommendations." },
      { id: "family-network", name: "{location} Family Network", audience: "Families", why: "Family groups help local service providers reach people already asking for recommendations." }
    ];
  } else {
    templates = BUSINESS_TYPE_TEMPLATES["Other Service"];
  }

  return templates.map(template => ({
    ...template,
    fit: [businessType],
    id: `rec-${template.id}-${location.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: template.name.replace("{location}", location),
    city: location
  }));
}

async function loadState() {
  const [data, auth] = await Promise.all([
    chromeGet(["userGroups", "messageVariants"]),
    getStoredSession()
  ]);
  state.user = auth.user || null;
  if (state.user) state.user.plan = state.user.plan || getUserPlan(state.user.email);
  state.recoverySession = auth.session?.type === "recovery" ? auth.session : null;
  state.groups = Array.isArray(data.userGroups)
    ? data.userGroups
    : DEFAULT_GROUPS.map(group => ({ ...group }));
  state.variants = Array.isArray(data.messageVariants) ? data.messageVariants : [];

  if (!Array.isArray(data.userGroups)) {
    await chromeSet({ userGroups: state.groups });
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  if (state.recoverySession) {
    renderPasswordRecovery();
    return;
  }

  if (!state.user) {
    renderAuth();
    return;
  }

  app.innerHTML = `
    <div class="dashboard">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <h1>reposter 𓆝 𓆟 𓆞 </h1>
          <p>${escapeHtml(state.user.businessName)} · ${escapeHtml(state.user.location)}</p>
        </div>
        <nav class="nav">
          ${navButton("home", "home")}
          ${navButton("groups", "my groups")}
          ${navButton("recommended", "recommended groups")}
          ${navButton("search", "find groups")}
          ${navButton("about", "about")}
        </nav>
        <div style="display:grid;gap:6px;margin-top:14px;padding:0 2px;min-width:0;">
          <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--surface-2);border:1px solid var(--border);border-radius:12px;min-width:0;overflow:hidden;">
            <span style="flex:1;min-width:0;font-size:12px;color:var(--subtle);font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(state.user.location)}">📍 ${escapeHtml(state.user.location)}</span>
            <button id="changeLocation" title="Change location" style="flex-shrink:0;padding:3px 7px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--muted);font-size:12px;line-height:1.4;">✎</button>
          </div>
          <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--surface-2);border:1px solid var(--border);border-radius:12px;min-width:0;overflow:hidden;">
            <span style="flex:1;min-width:0;font-size:12px;color:var(--subtle);font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${escapeHtml(state.user.businessType)}">🏢 ${escapeHtml(state.user.businessType)}</span>
            <button id="changeBusiness" title="Change business type" style="flex-shrink:0;padding:3px 7px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--muted);font-size:12px;line-height:1.4;">✎</button>
          </div>
        </div>
        <div class="sidebar-footer">
          <p class="muted">${escapeHtml(state.user.email)}</p>
          <button class="ghost" id="signOut">Sign out</button>
        </div>
      </aside>
      <section class="content" id="content"></section>
    </div>
  `;

  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      state.activeView = button.dataset.view;
      render();
    });
  });

  document.getElementById("signOut").addEventListener("click", async () => {
    await clearAuthSession();
    state.user = null;
    render();
  });

  document.getElementById("changeLocation").addEventListener("click", renderLocationModal);
  document.getElementById("changeBusiness").addEventListener("click", renderBusinessModal);

  renderActiveView();
}

function navButton(view, label) {
  const active = state.activeView === view ? "active" : "";
  return `<button class="${active}" data-view="${view}">${label}</button>`;
}

function renderLocationModal() {
  const existing = document.getElementById("locationModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "locationModal";
  modal.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(22,36,61,0.42);z-index:100;display:grid;place-items:center;" id="locationBackdrop">
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:22px;padding:28px 28px 22px;width:min(420px,90vw);box-shadow:0 24px 60px rgba(41,54,83,0.22);">
        <h3 style="font-size:18px;margin-bottom:6px;">change location</h3>
        <p class="muted" style="margin-bottom:18px;">Update your primary location — recommendations will refresh to match.</p>
        <label style="display:grid;gap:6px;color:var(--muted);font-size:13px;font-weight:700;">
          Location
          <input id="newLocationInput" type="text" list="locationOptionsModal"
            placeholder="Austin, Texas, United States"
            value="${escapeHtml(state.user.location)}"
            style="font-size:14px;" />
          <datalist id="locationOptionsModal">
            ${LOCATION_OPTIONS.map(loc => `<option value="${escapeHtml(loc)}"></option>`).join("")}
          </datalist>
          <span class="field-hint">Start typing a city or state. You can enter any location not listed.</span>
        </label>
        <div class="toolbar" style="margin-top:16px;">
          <button class="primary" id="saveLocationBtn">Save location</button>
          <button class="ghost" id="cancelLocationBtn">Cancel</button>
        </div>
        <p class="muted" id="locationModalStatus" style="margin-top:8px;font-size:13px;min-height:16px;"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("saveLocationBtn").addEventListener("click", async () => {
    const newLocation = document.getElementById("newLocationInput").value.trim();
    if (!newLocation) return;
    const status = document.getElementById("locationModalStatus");
    status.textContent = "Saving...";
    state.user.location = newLocation;
    await chromeSet({ dashboardUser: state.user });
    modal.remove();
    render();
  });

  document.getElementById("cancelLocationBtn").addEventListener("click", () => modal.remove());

  document.getElementById("locationBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "locationBackdrop") modal.remove();
  });

  document.getElementById("newLocationInput").focus();
}

function renderBusinessModal() {
  const existing = document.getElementById("businessModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "businessModal";
  modal.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(22,36,61,0.42);z-index:100;display:grid;place-items:center;" id="businessBackdrop">
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:22px;padding:28px 28px 22px;width:min(420px,90vw);box-shadow:0 24px 60px rgba(41,54,83,0.22);">
        <h3 style="font-size:18px;margin-bottom:6px;">change business type</h3>
        <p class="muted" style="margin-bottom:18px;">Update what you\u2019re advertising \u2014 recommendations will refresh to match.</p>
        <label style="display:grid;gap:6px;color:var(--muted);font-size:13px;font-weight:700;">
          Business type
          <select id="businessTypeInput" style="font-size:14px;">
            ${BUSINESS_TYPES.map(type =>
              `<option value="${escapeHtml(type)}" ${type === state.user.businessType ? "selected" : ""}>${escapeHtml(type)}</option>`
            ).join("")}
          </select>
          <span class="field-hint">Pick the category that best describes what you\u2019re posting about.</span>
        </label>
        <div class="toolbar" style="margin-top:16px;">
          <button class="primary" id="saveBusinessBtn">Save business type</button>
          <button class="ghost" id="cancelBusinessBtn">Cancel</button>
        </div>
        <p class="muted" id="businessModalStatus" style="margin-top:8px;font-size:13px;min-height:16px;"></p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("saveBusinessBtn").addEventListener("click", async () => {
    const newType = document.getElementById("businessTypeInput").value;
    if (!newType) return;
    state.user.businessType = newType;
    state.lookupResults = {};
    await chromeSet({ dashboardUser: state.user });
    modal.remove();
    render();
  });

  document.getElementById("cancelBusinessBtn").addEventListener("click", () => modal.remove());

  document.getElementById("businessBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "businessBackdrop") modal.remove();
  });
}

function renderAuth() {
  const configured = isSupabaseConfigured();
  const isSignup = state.authMode === "signup";
  const authModeText = isSignup
    ? "Create your workspace for saving messages, groups, and recommendations."
    : "Welcome back. Sign in to keep managing your saved groups and message variants.";
  const providerNote = configured
    ? ""
    : "Supabase is not configured yet. Prototype mode stores this login locally in Chrome.";

  app.innerHTML = `
    <div class="auth-shell">
      <div class="auth-card">
        <section class="auth-aside">
          <h1 class="brand">reposter 𓆝 𓆟 𓆞 </h1>
          <p class="brand-motto">specific groups. better reach. less posting chaos.</p>
          <p>Reposter makes advertising in targeted Facebook groups simpler by helping you organize messages, save group lists, and find audiences that fit your business.</p>
        </section>
        <section class="auth-form">
          <div class="toolbar auth-mode-toggle">
            <button class="${isSignup ? "primary" : "secondary"}" type="button" data-auth-mode="signup">Create account</button>
            <button class="${isSignup ? "secondary" : "primary"}" type="button" data-auth-mode="signin">Sign in</button>
          </div>
          <h2>${isSignup ? "create your workspace" : "sign in"}</h2>
          <p class="muted">${authModeText}</p>
          <p class="muted">${providerNote}</p>
          <form class="form-grid" id="loginForm">
            <label>
              Email
              <input id="email" type="email" placeholder="you@example.com" required />
            </label>
            <label>
              Password
              <input id="password" type="password" placeholder="${isSignup ? "At least 8 characters" : "Your password"}" minlength="8" ${configured ? "required" : ""} />
            </label>
            <label class="${isSignup ? "" : "hidden"}">
              Business name
              <input id="businessName" type="text" placeholder="noor's sat tutoring" ${isSignup ? "required" : ""} />
            </label>
            <label class="${isSignup ? "" : "hidden"}">
              Business type
              <select id="businessType">
                ${BUSINESS_TYPES.map(type => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join("")}
              </select>
            </label>
            <label class="hidden" id="customBusinessWrap">
              What kind of business?
              <input id="customBusinessType" type="text" placeholder="e.g. Lacrosse coach, piano teacher, mobile detailer" />
            </label>
            <label class="${isSignup ? "" : "hidden"}">
              Primary location
              <input id="location" type="text" list="locationOptions" placeholder="Austin, Texas, United States" ${isSignup ? "required" : ""} />
              <datalist id="locationOptions">
                ${LOCATION_OPTIONS.map(location => `<option value="${escapeHtml(location)}"></option>`).join("")}
              </datalist>
              <span class="field-hint">Start typing a city, state, or country. You can enter any location even if it is not suggested yet.</span>
            </label>
            <div class="toolbar">
              <button class="primary" type="submit">${isSignup ? "Create account" : "Sign in"}</button>
              ${isSignup ? "" : `<button class="ghost" type="button" id="forgotPassword">Forgot password?</button>`}
            </div>
            <p class="muted" id="authStatus">${escapeHtml(state.authNotice)}</p>
          </form>
        </section>
      </div>
    </div>
  `;

  document.querySelectorAll("[data-auth-mode]").forEach(button => {
    button.addEventListener("click", () => {
      state.authMode = button.dataset.authMode;
      state.authNotice = "";
      renderAuth();
    });
  });

  document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleAuth(state.authMode);
  });

  document.getElementById("forgotPassword")?.addEventListener("click", handlePasswordResetRequest);

  document.getElementById("businessType").addEventListener("change", () => {
    const isOther = document.getElementById("businessType").value === "Other Service";
    document.getElementById("customBusinessWrap").classList.toggle("hidden", !isOther);
    document.getElementById("customBusinessType").required = isSignup && isOther;
  });
}

async function handlePasswordResetRequest() {
  const status = document.getElementById("authStatus");
  const email = document.getElementById("email").value.trim();

  if (!email) {
    status.textContent = "Enter your email first, then I can send the reset link.";
    return;
  }

  if (!isSupabaseConfigured()) {
    status.textContent = "Password reset needs Supabase auth to be configured.";
    return;
  }

  status.textContent = "Sending password reset email...";

  try {
    await sendPasswordResetEmail(email);
    status.textContent = "Password reset email sent. Open the link, then set your new password here.";
  } catch (error) {
    status.textContent = getFriendlyAuthError(error.message);
  }
}

function renderPasswordRecovery() {
  app.innerHTML = `
    <div class="auth-shell">
      <div class="auth-card">
        <section class="auth-aside">
          <h1 class="brand">reposter</h1>
          <p>Set a new password, then come back to the same calm workspace with your groups and messages intact.</p>
        </section>
        <section class="auth-form">
          <h2>reset password</h2>
          <p class="muted">Choose a new password for ${escapeHtml(state.user?.email || "your account")}.</p>
          <form class="form-grid" id="passwordResetForm">
            <label>
              New password
              <input id="newPassword" type="password" placeholder="At least 8 characters" minlength="8" required />
            </label>
            <button class="primary" type="submit">Update password</button>
            <p class="muted" id="passwordResetStatus"></p>
          </form>
        </section>
      </div>
    </div>
  `;

  document.getElementById("passwordResetForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.getElementById("passwordResetStatus");
    const password = document.getElementById("newPassword").value;

    status.textContent = "Updating password...";

    try {
      await updatePassword(state.recoverySession.accessToken, password);
      await clearAuthSession();
      state.recoverySession = null;
      state.user = null;
      state.authMode = "signin";
      state.authNotice = "Password updated. Sign in with your new password.";
      renderAuth();
    } catch (error) {
      status.textContent = getFriendlyAuthError(error.message);
    }
  });
}

async function handleAuth(mode) {
  const status = document.getElementById("authStatus");
  const email = document.getElementById("email").value.trim();
  const businessTypeSelect = document.getElementById("businessType");
  const selectedBusinessType = businessTypeSelect?.value || "Small Business";
  const profile = {
    email,
    businessName: document.getElementById("businessName")?.value.trim() || "My Business",
    businessType: selectedBusinessType === "Other Service"
      ? document.getElementById("customBusinessType").value.trim()
      : selectedBusinessType,
    location: document.getElementById("location")?.value.trim() || "My Area"
  };
  const password = document.getElementById("password").value;

  status.textContent = mode === "signup" ? "Creating workspace..." : "Signing in...";

  try {
    if (isSupabaseConfigured()) {
      const response = mode === "signup"
        ? await signUpWithPassword({ email: profile.email, password, profile })
        : await signInWithPassword({ email: profile.email, password });

      if (!response.access_token && mode === "signup") {
        status.textContent = "Check your email to confirm your account, then sign in.";
        return;
      }

      state.user = await storeAuthSession(response, profile);
    } else {
      if (SUPABASE_CONFIG.requireConfiguredAuth) {
        status.textContent = "Supabase auth must be configured before signing in.";
        return;
      }

      state.user = {
        ...profile,
        authProvider: "local"
      };
      await chromeSet({ dashboardUser: state.user });
    }

    render();
  } catch (error) {
    status.textContent = getFriendlyAuthError(error.message);
  }
}

function getFriendlyAuthError(message) {
  if (/rate limit|too many|email.*limit/i.test(message)) {
    return "Email rate limit hit. Wait a bit before trying again, or turn off email confirmations while testing.";
  }
  if (/already registered|already exists/i.test(message)) {
    return "That email is already registered. Try signing in, or fully remove the user in Supabase Auth before signing up again.";
  }
  return message;
}

function renderActiveView() {
  const content = document.getElementById("content");
  if (state.activeView === "groups") {
    renderGroups(content);
    return;
  }
  if (state.activeView === "recommended") {
    renderRecommended(content);
    return;
  }
  if (state.activeView === "search") {
    renderSearch(content);
    return;
  }
  if (state.activeView === "about") {
    renderAbout(content);
    return;
  }
  renderHome(content);
}

function renderSearch(content) {
  const atLimit = state.user.plan !== "pro" && state.groups.length >= FREE_GROUP_LIMIT;
  const results = state.searchResults;

  let resultsHtml = "";
  if (state.searchLoading) {
    resultsHtml = `<div class="empty" style="margin-top:16px;">Searching Facebook groups…</div>`;
  } else if (results === null) {
    resultsHtml = "";
  } else if (!results.length) {
    resultsHtml = `<div class="empty" style="margin-top:16px;">No public groups found. Try a broader keyword, or <a href="https://www.facebook.com/search/groups?q=${encodeURIComponent(state.searchQuery)}" target="_blank">open Facebook search directly</a>.</div>`;
  } else {
    resultsHtml = `
      <div class="table-card" style="margin-top:16px;">
        <div class="table-head" style="grid-template-columns:1.4fr 0.9fr auto;">
          <span>Group</span><span>Members</span><span></span>
        </div>
        <div class="group-list-large">
          ${results.map((candidate, index) => `
            <div class="group-row" style="grid-template-columns:1.4fr 0.9fr auto;align-items:center;gap:12px;">
              <div>
                <strong>${escapeHtml(candidate.name)}</strong>
                <div class="meta">${escapeHtml(candidate.privacy || "")}</div>
              </div>
              <span class="muted" style="font-size:13px;">${escapeHtml(candidate.members || "—")}</span>
              <button class="secondary" style="white-space:nowrap;" data-search-index="${index}" ${atLimit ? "disabled" : ""}>Save group</button>
            </div>
          `).join("")}
        </div>
      </div>`;
  }

  content.innerHTML = `
    <div class="page-title">
      <div>
        <h2>find groups</h2>
        <p class="muted">Search for niche Facebook groups by keyword, community, or interest.</p>
      </div>
    </div>
    ${atLimit ? `<div class="notice" style="margin-bottom:14px;border-radius:14px;padding:12px 16px;max-width:100%;">🔒 You\'re on the free plan — ${FREE_GROUP_LIMIT} groups max. Upgrade to save more.</div>` : ""}
    <div class="card" style="max-width:680px;">
      <p class="muted" style="margin-bottom:14px;font-size:13px;line-height:1.5;">
        Try keywords like <em>“black entrepreneurs chicago”</em>, <em>“latino families dallas”</em>, <em>“south asian professionals seattle”</em>, <em>“rooms for rent atlanta”</em>, or any community or niche group you want to reach.
      </p>
      <div class="toolbar" style="gap:8px;">
        <input type="text" id="searchInput" placeholder="e.g. rooms for rent in san francisco" value="${escapeHtml(state.searchQuery)}" style="flex:1;" />
        <button class="primary" id="runSearch">Search</button>
      </div>
    </div>
    ${resultsHtml}
  `;

  const searchInput = document.getElementById("searchInput");
  const runSearch = document.getElementById("runSearch");

  async function doSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    state.searchQuery = query;
    state.searchLoading = true;
    state.searchResults = null;
    renderSearch(content);

    const response = await sendMessage({ action: "findGroupUrls", query });
    state.searchLoading = false;
    state.searchResults = response.ok ? (response.candidates || []) : [];
    renderSearch(content);
  }

  runSearch.addEventListener("click", doSearch);
  searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });

  content.querySelectorAll("[data-search-index]").forEach(button => {
    button.addEventListener("click", async () => {
      if (atLimit) return;
      const candidate = state.searchResults[Number(button.dataset.searchIndex)];
      if (!candidate) return;
      state.groups.push({
        id: createId("group"),
        name: candidate.name,
        url: candidate.url,
        city: state.user.location,
        audience: "Community",
        selected: true
      });
      await chromeSet({ userGroups: state.groups });
      showToast(`Saved "${candidate.name}" to My Groups`);
      button.textContent = "Saved";
      button.disabled = true;
      button.classList.replace("primary", "secondary");
    });
  });
}

function renderHome(content) {
  const selectedCount = state.groups.filter(group => group.selected !== false).length;

  content.innerHTML = `
    <div class="page-title">
      <div>
        <h2>home</h2>
        <p class="muted">A quick read on your posting setup.</p>
      </div>
      <button class="primary" id="openPopupNote">Use popup to post</button>
    </div>
    <div class="stats-grid">
      <div class="stat"><strong>${state.groups.length}</strong><span>saved groups</span></div>
      <div class="stat"><strong>${selectedCount}</strong><span>selected in popup</span></div>
      <div class="stat"><strong>${state.variants.length}</strong><span>message variants</span></div>
    </div>
    <div class="grid-2">
      <section class="card">
        <h3>next best setup step</h3>
        <p class="muted">Review recommended groups, save the best fits, then keep the popup focused on choosing messages and launching posts.</p>
      </section>
      <section class="card">
        <h3>recent groups</h3>
        <div class="list">
          ${state.groups.slice(0, 4).map(group => `
            <div class="mini-row">
              <strong>${escapeHtml(group.name)}</strong>
              <div class="meta">${escapeHtml(group.city || "Local")} · ${escapeHtml(group.audience || "Community")}</div>
            </div>
          `).join("") || `<div class="empty">No groups saved yet.</div>`}
        </div>
      </section>
    </div>
  `;

  document.getElementById("openPopupNote").addEventListener("click", () => {
    sendMessage({ action: "openPopup" });
  });
}

function renderGroups(content) {
  const atLimit = state.user.plan !== "pro" && state.groups.length >= FREE_GROUP_LIMIT;
  const upgradeNotice = atLimit
    ? `<div class="notice" style="margin-bottom:14px;border-radius:14px;padding:12px 16px;max-width:100%;">
        🔒 You\'re on the free plan — ${FREE_GROUP_LIMIT} groups max.
        Upgrade to pro for unlimited groups. Contact <a href="mailto:reposterfaqs@gmail.com">reposterfaqs@gmail.com</a> to upgrade.
      </div>`
    : state.user.plan === "free"
      ? `<div style="margin-bottom:14px;color:var(--subtle);font-size:13px;">${state.groups.length} / ${FREE_GROUP_LIMIT} groups used on free plan.</div>`
      : "";
  content.innerHTML = `
    <div class="page-title">
      <div>
        <h2>my groups</h2>
        <p class="muted">Groups saved here appear in the popup.</p>
      </div>
      <button class="primary" id="addGroup" ${atLimit ? "disabled" : ""}>Add group</button>
    </div>
    ${upgradeNotice}
    <section class="table-card">
      <div class="table-head">
        <span>Group</span>
        <span>Location</span>
        <span>Audience</span>
        <span>URL</span>
        <span>Use</span>
      </div>
      <div class="group-list-large">
        ${state.groups.map(groupRow).join("") || `<div class="empty">No groups saved yet.</div>`}
      </div>
    </section>
  `;

  document.getElementById("addGroup").addEventListener("click", addGroup);
  document.querySelectorAll("[data-toggle-group]").forEach(input => {
    input.addEventListener("change", async () => {
      const group = state.groups.find(item => item.id === input.dataset.toggleGroup);
      if (!group) return;
      group.selected = input.checked;
      await chromeSet({ userGroups: state.groups });
    });
  });
  document.querySelectorAll("[data-remove-group]").forEach(button => {
    button.addEventListener("click", async () => {
      state.groups = state.groups.filter(group => group.id !== button.dataset.removeGroup);
      await chromeSet({ userGroups: state.groups });
      renderGroups(content);
    });
  });
  document.querySelectorAll("[data-edit-url]").forEach(button => {
    button.addEventListener("click", async () => {
      const group = state.groups.find(item => item.id === button.dataset.editUrl);
      if (!group) return;
      const url = prompt("Facebook group URL", group.url || "");
      if (!url) return;
      group.url = url.trim();
      group.selected = true;
      await chromeSet({ userGroups: state.groups });
      renderGroups(content);
    });
  });
}

function groupRow(group) {
  return `
    <div class="group-row">
      <strong>${escapeHtml(group.name)}</strong>
      <span class="muted">${escapeHtml(group.city || "Local")}</span>
      <span class="pill">${escapeHtml(group.audience || "Community")}</span>
      <span class="muted">${escapeHtml(group.url || "No URL")}</span>
      <span class="toolbar">
        <input type="checkbox" data-toggle-group="${escapeHtml(group.id)}" ${group.selected !== false ? "checked" : ""} ${group.url ? "" : "disabled"} />
        <button class="ghost" data-edit-url="${escapeHtml(group.id)}">${group.url ? "Edit URL" : "Add URL"}</button>
        <button class="ghost" data-remove-group="${escapeHtml(group.id)}">Remove</button>
      </span>
    </div>
  `;
}

async function addGroup() {
  if (state.user.plan !== "pro" && state.groups.length >= FREE_GROUP_LIMIT) {
    alert(`You\'ve reached the ${FREE_GROUP_LIMIT}-group limit on the free plan. Upgrade to pro for unlimited groups.`);
    return;
  }
  const name = prompt("Group name");
  if (!name) return;
  const url = prompt("Facebook group URL");
  if (!url) return;
  const city = prompt("Location or city", state.user.location) || state.user.location;
  const audience = prompt("Audience type", "Community") || "Community";

  state.groups.push({
    id: createId("group"),
    name: name.trim(),
    url: url.trim(),
    city: city.trim(),
    audience: audience.trim(),
    selected: true
  });

  await chromeSet({ userGroups: state.groups });
  render();
}

function renderRecommended(content) {
  const savedIds = new Set(state.groups.map(group => group.recommendedId || group.id));
  const businessType = state.user.businessType;
  const recommendedGroups = getRecommendedGroups();
  const filterOptions = ["", ...new Set(recommendedGroups.flatMap(group => group.fit))];
  if (!filterOptions.includes(state.filter)) state.filter = "";

  content.innerHTML = `
    <div class="page-title">
      <div>
        <h2>recommended groups</h2>
        <p class="muted">A starting list based on ${escapeHtml(businessType)} businesses around ${escapeHtml(state.user.location)}.</p>
        ${state.recommendationNotice ? `<p class="notice">${escapeHtml(state.recommendationNotice)}</p>` : ""}
      </div>
      <div class="toolbar">
        <select id="fitFilter">
          ${filterOptions.map(option => `
            <option value="${escapeHtml(option)}">${option ? escapeHtml(option) : "All recommendations"}</option>
          `).join("")}
        </select>
      </div>
    </div>
    <div class="recommendation-grid" id="recommendations"></div>
  `;

  const filter = document.getElementById("fitFilter");
  filter.value = state.filter;
  filter.addEventListener("change", () => {
    state.filter = filter.value;
    drawRecommendations(savedIds);
  });

  drawRecommendations(savedIds, recommendedGroups);
}

function showToast(message) {
  const existing = document.getElementById("repoasterToast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "repoasterToast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--text);
    color: #fff;
    padding: 10px 20px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 750;
    box-shadow: 0 8px 24px rgba(22,36,61,0.22);
    z-index: 200;
    opacity: 1;
    transition: opacity 0.4s ease;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);

  setTimeout(() => { toast.style.opacity = "0"; }, 2600);
  setTimeout(() => { toast.remove(); }, 3000);
}

function drawRecommendations(savedIds, recommendedGroups = getRecommendedGroups()) {
  const container = document.getElementById("recommendations");
  const filter = state.filter;
  const matches = recommendedGroups.filter(group =>
    !filter || group.fit.includes(filter)
  );

  container.innerHTML = matches.map(group => {
    const saved = savedIds.has(group.id);
    return `
      <article class="recommendation">
        <span class="pill">${escapeHtml(group.audience)}</span>
        <strong>${escapeHtml(group.name)}</strong>
        <div class="meta">${escapeHtml(group.city)} · ${group.fit.map(escapeHtml).join(" · ")}</div>
        <p class="muted">${escapeHtml(group.why)}</p>
        <div class="recommendation-actions">
          <span class="muted">${saved ? "Saved to My Groups" : group.url ? "Verified URL" : "URL lookup needed"}</span>
          <div class="toolbar">
            ${group.url ? "" : `<button class="secondary" data-find-rec="${escapeHtml(group.id)}" ${state.loadingLookupId === group.id ? "disabled" : ""}>${state.loadingLookupId === group.id ? "Searching..." : "Find URLs"}</button>`}
            <button class="${saved ? "secondary" : "primary"}" data-save-rec="${escapeHtml(group.id)}" ${saved || !group.url ? "disabled" : ""}>${saved ? "Saved" : group.url ? "Save group" : "Find first"}</button>
          </div>
        </div>
        ${renderCandidateResults(group)}
      </article>
    `;
  }).join("") || `<div class="empty">No recommendations match this filter.</div>`;

  document.querySelectorAll("[data-find-rec]").forEach(button => {
    button.addEventListener("click", async () => {
      const rec = recommendedGroups.find(group => group.id === button.dataset.findRec);
      if (!rec) return;
      state.loadingLookupId = rec.id;
      drawRecommendations(savedIds, recommendedGroups);
      const response = await sendMessage({
        action: "findGroupUrls",
        query: `${rec.name} ${state.user.location} Facebook group`
      });
      state.lookupResults[rec.id] = response?.ok ? response.candidates : [];
      state.loadingLookupId = null;
      drawRecommendations(new Set(state.groups.map(group => group.recommendedId || group.id)), recommendedGroups);
    });
  });

  document.querySelectorAll("[data-save-candidate]").forEach(button => {
    button.addEventListener("click", async () => {
      const rec = recommendedGroups.find(group => group.id === button.dataset.recId);
      const candidate = (state.lookupResults[button.dataset.recId] || [])[Number(button.dataset.candidateIndex)];
      if (!rec || !candidate) return;
      if (state.user.plan !== "pro" && state.groups.length >= FREE_GROUP_LIMIT) {
        alert(`You've reached the ${FREE_GROUP_LIMIT}-group limit on the free plan. Upgrade to pro for unlimited groups.`);
        return;
      }

      state.groups.push({
        id: createId("group"),
        recommendedId: rec.id,
        name: candidate.name || rec.name,
        url: candidate.url,
        city: rec.city,
        audience: rec.audience,
        selected: true
      });
      state.savedCandidateUrls.add(candidate.url);
      await chromeSet({ userGroups: state.groups });
      showToast(`Saved "${candidate.name || rec.name}" to My Groups`);
      const candidateRow = button.closest(".candidate-row");
      if (candidateRow) {
        button.textContent = "Saved";
        button.disabled = true;
        button.classList.replace("primary", "secondary");
      }
    });
  });

  document.querySelectorAll("[data-save-rec]").forEach(button => {
    button.addEventListener("click", async () => {
      const rec = recommendedGroups.find(group => group.id === button.dataset.saveRec);
      if (!rec) return;
      if (state.user.plan !== "pro" && state.groups.length >= FREE_GROUP_LIMIT) {
        alert(`You've reached the ${FREE_GROUP_LIMIT}-group limit on the free plan. Upgrade to pro for unlimited groups.`);
        return;
      }
      state.groups.push({
        id: createId("group"),
        recommendedId: rec.id,
        name: rec.name,
        url: rec.url || "",
        city: rec.city,
        audience: rec.audience,
        selected: Boolean(rec.url)
      });
      await chromeSet({ userGroups: state.groups });
      showToast(`Saved "${rec.name}" to My Groups`);
      button.textContent = "Saved";
      button.disabled = true;
      button.classList.replace("primary", "secondary");
    });
  });
}

function renderCandidateResults(group) {
  const candidates = state.lookupResults[group.id];
  if (!candidates) return "";

  if (!candidates.length) {
    return `<div class="candidate-list"><div class="empty">No public group URLs found yet. <a href="${facebookGroupSearchUrl(group)}" target="_blank">Open Facebook search</a></div></div>`;
  }

  return `
    <div class="candidate-list">
      ${candidates.map((candidate, index) => `
        <div class="candidate-row">
          <div>
            <strong>${escapeHtml(candidate.name)}</strong>
            <div class="meta">${escapeHtml(candidate.privacy || "Facebook group")} ${candidate.members ? `&middot; ${escapeHtml(candidate.members)}` : ""}</div>
          </div>
          <button class="${state.savedCandidateUrls.has(candidate.url) ? "secondary" : "secondary"}" data-rec-id="${escapeHtml(group.id)}" data-candidate-index="${index}" data-save-candidate ${state.savedCandidateUrls.has(candidate.url) ? "disabled" : ""}>
            ${state.savedCandidateUrls.has(candidate.url) ? "Saved" : "Save"}
          </button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderAbout(content) {
  content.innerHTML = `
    <div class="page-title">
      <div>
        <h2>about</h2>
        <p class="muted">Built to help local businesses post with a little more calm and a lot less tab chaos.</p>
      </div>
    </div>
    <div class="about-layout">
      <section class="card about-card about-card-large">
        <span class="pill">Made locally</span>
        <h3>developed by noor 𓆝 𓆟 𓆞 𓆝</h3>
        <p class="muted">reposter is an early facebook discovery platform. tutors, small businesses, and local service providers that want to spread their word to niche groups and post more consistently: this is for you! this is always a work in progress and I'm always open to feedback. &lt;3</p>
        <p class="muted">Send notes to <a href="mailto:reposterfaqs@gmail.com">reposterfaqs@gmail.com</a>. Include what you were trying to do, what happened, and any screenshots that make the issue easier to understand.</p>
      </section>
    </div>
  `;
}

loadState().then(render);