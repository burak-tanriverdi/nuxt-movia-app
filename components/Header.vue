<template>
    <div class="relative z-10 w-full bg-blue-900">
      <div class="absolute bottom-0 left-0 w-full h-1 bg-indigo-500"></div>
  
      <header class="flex items-center justify-between px-6 py-4 mx-auto text-white max-w-7xl">
        <nav class="flex space-x-8">
          <RouterLink to="/" class="hover:text-gray-300">Homepage</RouterLink>
  
          <div class="relative group">
            <span class="cursor-pointer hover:text-gray-300">Movies</span>
            <div class="absolute left-0 flex-col hidden w-32 gap-2 pt-2 text-gray-900 bg-white rounded shadow-lg top-full group-hover:flex">
              <RouterLink to="/movie/populerMovies" class="px-4 py-2 hover:bg-gray-100">Popular</RouterLink>
              <RouterLink to="/movie/upcomingMovies" class="px-4 py-2 hover:bg-gray-100">Upcoming</RouterLink>
              <RouterLink to="/movie/topRatedMovies" class="px-4 py-2 hover:bg-gray-100">Top Rated</RouterLink>
            </div>
          </div>
  
          <div class="relative group">
            <span class="cursor-pointer hover:text-gray-300">TV Shows</span>
            <div class="absolute left-0 flex-col hidden w-32 gap-2 pt-2 text-gray-900 bg-white rounded shadow-lg top-full group-hover:flex">
              <RouterLink to="/tvShow/popularTvShows" class="px-4 py-2 hover:bg-gray-100">Popular</RouterLink>
              <RouterLink to="/tvShow/upcomingTvShows" class="px-4 py-2 hover:bg-gray-100">Upcoming</RouterLink>
              <RouterLink to="/tvShow/topRatedTvShows" class="px-4 py-2 hover:bg-gray-100">Top Rated</RouterLink>
            </div>
          </div>
        </nav>
      </header>
    </div>
  </template>
  