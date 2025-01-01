git git # TCG Repricer

A comprehensive trading card game repricing application built with React, Tailwind CSS, and Supabase.

## Features

- Real-time price monitoring and updates
- Integration with TCGPlayer and eBay
- Automated repricing rules
- Price history tracking
- Market trend analysis
- Competitor monitoring
- Inventory management

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Tanstack Query
- Supabase
- Chart.js
- Lucide Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tcg-repricer.git
   ```

2. Install dependencies:
   ```bash
   cd tcg-repricer
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src/components` - React components
- `/src/pages` - Page components
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions and API clients
- `/src/store` - Global state management
- `/supabase/migrations` - Database migrations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.