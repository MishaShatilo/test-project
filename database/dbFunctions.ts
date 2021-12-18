import { Video } from "../models/video";
interface DbParams {
  id?: number;
  userId?: number;
  videoName?: string;
  videoLink?: string;
}
class DbFunc {
  async create({ userId, videoName, videoLink }: DbParams) {
    const newVideo = await Video.create({
      userId: userId,
      videoName: videoName,
      videoLink: videoLink,
    });
    const savedVideo = await newVideo.save();
    return savedVideo;
  }
  async findOneByName({ videoName }: DbParams) {
    const video = await Video.findOne({ where: { videoName: videoName } });
    return video;
  }
  async findOneByLink({ videoLink }: DbParams) {
    const video = await Video.findOne({ where: { videoLink: videoLink } });
    return video;
  }
  async findAll({ userId }: DbParams) {
    const videos = await Video.findAll({ where: { userId: +userId } });
    return videos;
  }
  async update({ id, videoName, videoLink }: DbParams) {
    const updatedVideo = await Video.update(
      { videoName, videoLink },
      { where: { id: id } }
    );
    return updatedVideo;
  }
  async delete({ id }) {
    const deletedVideo = await Video.destroy({ where: { id: id } });
    return deletedVideo;
  }
}
const dbFunc = new DbFunc();
export { dbFunc };
