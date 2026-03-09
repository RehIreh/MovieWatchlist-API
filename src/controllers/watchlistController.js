import { prisma } from "../config/db.js"



const addToWatchList = async (req, res) => {
  const {movieId, status, rating, notes, userId} = req.body

  // Checking Movie is it avaible
  const movie = await prisma.movie.findUnique({
    where: {id: movieId},
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found"});
  }

  // Checking Movie is already added
    const existingWatchlist = await prisma.watchListItem.findUnique({
    where: { userId_movieId :{
      userId: req.user.id,
      movieId:  movieId
    },
  },
  });

   if (existingWatchlist) {
    return res.status(400).json({ error: "Movie already in the List"});
  };


  const watchListItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      watchListItem,
    }
  });
};

const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes} = req.body;

  //verify
  const watchlistItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id},
  });

  if (!watchlistItem){
    return res.status(404).json({ error: "Watchlist item not found"});
  }

  if (watchlistItem.userId !== req.user.id){
    return res.status(403).json({ error: "Not allowed to update this watchlst item"})
  }

  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  const updateWatchlistItem = await prisma.watchListItem.update({
    where: {id:req.params.id},
    data: updateData,
  });
  
  res.status(200).json({ message:"Success", data:updateWatchlistItem})

};

const removefromWatchlist = async (req, res) => {
  const watchListItem = await prisma.watchListItem.findUnique({
    where: { id:req.params.id},
  });
  
  if (!watchListItem){
    return res.status(404).json({error: "Watchlist item not found"});
  }

  if (watchListItem.userId !== req.user.id){
    return res.status(403).json({ error: "Not allowed"});
  }

  await prisma.watchListItem.delete({
    where: { id: req.params.id},
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from the watchlist"
  });
};


export { addToWatchList, removefromWatchlist, updateWatchlistItem }