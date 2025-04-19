import { Agent } from '../types';

export const agents: Agent[] = [
  {
    id: '1',
    name: 'WriteBot',
    description: 'AI-powered writing assistant for content creation',
    longDescription: 'WriteBot is an advanced AI writing assistant that helps with content creation, editing, and proofreading. It can generate blog posts, articles, and social media content based on your input.',
    capabilities: ['Content creation', 'Grammar checking', 'Style suggestions', 'SEO optimization'],
    instructions: 'Simply provide a topic or outline, and WriteBot will generate content for you.',
    examples: [
      'Write a blog post about sustainable living',
      'Create a product description for a coffee maker',
      'Draft a professional email to a client'
    ],
    pricing: '$15/month',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    reviews: [
      {
        id: '101',
        userId: 'user1',
        userName: 'John Smith',
        rating: 5,
        comment: 'WriteBot has completely transformed my content creation process. Highly recommended!',
        date: '2025-01-15'
      },
      {
        id: '102',
        userId: 'user2',
        userName: 'Sarah Johnson',
        rating: 4,
        comment: 'Great tool for overcoming writer\'s block, though sometimes needs guidance.',
        date: '2025-01-10'
      }
    ],
    categories: ['Writing', 'Content Creation', 'Productivity']
  },
  {
    id: '2',
    name: 'CodeAssist',
    description: 'AI coding assistant for developers',
    longDescription: 'CodeAssist is an intelligent coding assistant that helps developers write, review, and debug code. It supports multiple programming languages and frameworks.',
    capabilities: ['Code generation', 'Bug fixing', 'Code optimization', 'Documentation'],
    instructions: 'Describe what you\'re trying to build or the issue you\'re facing, and CodeAssist will provide code solutions.',
    examples: [
      'Create a React component for a login form',
      'Fix this bug in my Python function',
      'Optimize this SQL query for better performance'
    ],
    pricing: '$25/month',
    imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviews: [
      {
        id: '201',
        userId: 'user3',
        userName: 'Michael Chen',
        rating: 5,
        comment: 'As a junior developer, CodeAssist has been like having a senior developer always available to help.',
        date: '2025-02-05'
      },
      {
        id: '202',
        userId: 'user4',
        userName: 'Emma Rodriguez',
        rating: 4.5,
        comment: 'Incredible tool that saves me hours of debugging time every week.',
        date: '2025-01-28'
      }
    ],
    categories: ['Development', 'Coding', 'Productivity']
  },
  {
    id: '3',
    name: 'DesignGenius',
    description: 'AI design assistant for creative projects',
    longDescription: 'DesignGenius helps you create stunning visual designs for various purposes. From logos to social media graphics, this AI assistant makes design accessible to everyone.',
    capabilities: ['Logo creation', 'Social media graphics', 'UI/UX suggestions', 'Color palette generation'],
    instructions: 'Describe your design needs, including style preferences and purpose, and DesignGenius will create options for you.',
    examples: [
      'Create a modern logo for a tech startup',
      'Design an Instagram post for a coffee shop',
      'Suggest a color palette for a health and wellness brand'
    ],
    pricing: '$20/month',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    reviews: [
      {
        id: '301',
        userId: 'user5',
        userName: 'Alex Turner',
        rating: 5,
        comment: 'As someone with no design background, DesignGenius has been a game-changer for my small business.',
        date: '2025-02-10'
      },
      {
        id: '302',
        userId: 'user6',
        userName: 'Priya Patel',
        rating: 4,
        comment: 'Good for quick designs, though sometimes lacks the finesse of a professional designer.',
        date: '2025-01-30'
      }
    ],
    categories: ['Design', 'Creative', 'Graphics']
  },
  {
    id: '4',
    name: 'DataAnalyst',
    description: 'AI data analysis and visualization assistant',
    longDescription: 'DataAnalyst helps you make sense of complex data sets with advanced analysis and beautiful visualizations. Perfect for business intelligence and research purposes.',
    capabilities: ['Data analysis', 'Visualization creation', 'Trend identification', 'Report generation'],
    instructions: 'Upload your data or connect to your data source, then ask questions or specify what insights you\'re looking for.',
    examples: [
      'Analyze my sales data for the past quarter and identify trends',
      'Create a visualization of customer demographics',
      'Generate a monthly performance report for my team'
    ],
    pricing: '$30/month',
    imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviews: [
      {
        id: '401',
        userId: 'user7',
        userName: 'David Wilson',
        rating: 5,
        comment: 'DataAnalyst has transformed how our marketing team uses data to make decisions.',
        date: '2025-02-15'
      },
      {
        id: '402',
        userId: 'user8',
        userName: 'Lisa Campbell',
        rating: 4,
        comment: 'Very powerful tool, though it took some time to learn how to use it effectively.',
        date: '2025-02-01'
      }
    ],
    categories: ['Data', 'Analytics', 'Business Intelligence']
  },
  {
    id: '5',
    name: 'HealthCoach',
    description: 'AI health and wellness assistant',
    longDescription: 'HealthCoach provides personalized nutrition, fitness, and wellness guidance based on your goals and preferences. It adapts to your progress and helps you stay on track.',
    capabilities: ['Meal planning', 'Workout recommendations', 'Progress tracking', 'Wellness tips'],
    instructions: 'Share your health goals, preferences, and restrictions, and HealthCoach will provide personalized guidance.',
    examples: [
      'Create a vegetarian meal plan for weight loss',
      'Suggest home workouts for building strength with minimal equipment',
      'Track my sleep patterns and suggest improvements'
    ],
    pricing: '$18/month',
    imageUrl: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.4,
    reviews: [
      {
        id: '501',
        userId: 'user9',
        userName: 'Jennifer Lee',
        rating: 5,
        comment: 'HealthCoach has helped me develop better eating habits and stick to my fitness routine.',
        date: '2025-02-20'
      },
      {
        id: '502',
        userId: 'user10',
        userName: 'Robert Martinez',
        rating: 4,
        comment: 'Good recommendations, though I wish it had more options for dietary restrictions.',
        date: '2025-02-05'
      }
    ],
    categories: ['Health', 'Fitness', 'Wellness']
  }
];