import React from 'react';
import { Film, Heart, Star, Users } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Film,
      title: 'Curated Collection',
      description: 'Build and organize your personal movie library with detailed information and ratings.'
    },
    {
      icon: Star,
      title: 'Rating System',
      description: 'Rate movies on a 10-point scale and keep track of your favorites.'
    },
    {
      icon: Users,
      title: 'Director Focus',
      description: 'Discover and explore movies by your favorite directors and cinematographers.'
    },
    {
      icon: Heart,
      title: 'Passion Project',
      description: 'Built by movie enthusiasts, for movie enthusiasts who appreciate great cinema.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">
          About <span className="text-amber-500">MovieVault</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          MovieVault is a minimalist, elegant platform designed for true movie lovers who 
          want to catalog, discover, and celebrate the art of cinema.
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-slate-900" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            In an age of endless streaming platforms and overwhelming choices, MovieVault provides 
            a sanctuary for thoughtful movie curation. We believe that great films deserve to be 
            remembered, discussed, and celebrated.
          </p>
          <p>
            Our platform strips away the noise and focuses on what matters most: the movies themselves, 
            the visionary directors who create them, and the personal connections we form with cinema.
          </p>
          <p>
            Whether you're a casual movie watcher or a serious cinephile, MovieVault gives you the 
            tools to build a meaningful collection that reflects your unique taste in film.
          </p>
        </div>
      </div>

      <div className="text-center bg-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Start Your Collection</h2>
        <p className="text-slate-400 mb-6">
          Ready to organize your favorite films? Begin building your personal movie vault today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/add-movie"
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Add Your First Movie
          </a>
          <a
            href="/"
            className="bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Browse Collection
          </a>
        </div>
      </div>
    </div>
  );
}