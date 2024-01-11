import { Router } from "express";
const tourRouter=Router();
import { getAllTours, createTour, getTour, updateTour, deleteTour, getTourStats } from "../controllers/tourController.js";

tourRouter.route("/stats").get(getTourStats);

tourRouter.route("/")
.get(getAllTours)
.post(createTour);

tourRouter.route("/:id")
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

export default tourRouter;