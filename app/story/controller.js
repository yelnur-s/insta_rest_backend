const fs = require('fs');
const path = require('path');
const Story = require('./Story')
const { Op } = require('sequelize');
const createStory = (req, res) => {
  if(
    req.file
  ){
    const currentDate = new Date();
    const validTill = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000)); // Добавляем 24 часа в миллисекундах

    const story = Story.create({
      video: '/images/stories/' + req.file.filename,
      valid_till: validTill,
      userId: req.user.id
    })
    res.status(200).end();
  }else{
    res.status(401).send({message: "заполните все поля"});
  }
}
const deleteStory = async (req, res) => {
  const story = await Story.findByPk(req.params.id)
  fs.unlinkSync(path.join(__dirname + '../../../public' + story.video));
  try {
    await Story.destroy({
      where: { id: req.params.id }
    })
    res.status(200).send();
  } catch (error) {
      console.error('Error deleting item by ID:', error);
    throw error;
  }
}
const userStoriesById = async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Используем Sequelize для поиска историй за последние 24 часа
    const stories = await Story.findAll({
      where: {
        userId: req.user.id,
        valid_till: {
          // если valid_till < twentyFourHoursAgo то у сторис прошло 24 часа
          [Op.gte]: twentyFourHoursAgo
        }
      }
    });

     res.status(200).send(stories);
  } catch (error) {
      console.error('Error while fetching items:', error);
    throw error;
  }
}
module.exports = {
  createStory,
  deleteStory,
  userStoriesById
}