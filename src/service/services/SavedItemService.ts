import { SavedItemType } from './../../data/entities/SavedItemType';
import { SavedItem } from './../../data/entities/SavedItem';
import { AppErrorCode } from "../errors/AppErrorCode";
import { AppError } from "../errors/AppError";
import { Repository } from "typeorm";
import { User } from '../../data/entities/User';

export class SavedItemService {
  private savedItemRepository: Repository<SavedItem>;
  private savedItemTypeRepository: Repository<SavedItemType>
  private userRepository: Repository<User>;

  constructor(
    savedItemRepository: Repository<SavedItem>,
    savedItemTypeRepository: Repository<SavedItemType>,
    userRepository: Repository<User>
  ) {
    this.savedItemRepository = savedItemRepository;
    this.savedItemTypeRepository = savedItemTypeRepository;
    this.userRepository = userRepository;
  }

  getAllSavedItems = async (): Promise<SavedItem[]> => {
    try {
      return await this.savedItemRepository.find();
    } catch (e: any) {
      return Promise.reject(new AppError(AppErrorCode.SYS02));
    }
  };

  getAllSavedItemByUser = async (userId:number) => {
    try {
      return await this.savedItemRepository.find({
        where: {user: userId}
      });
    } catch (e: any) {
      return Promise.reject(new AppError(AppErrorCode.SYS02));
    }
  }

  createSavedItem = async (savedItem:SavedItem) => {
    try {
      //Validate user existence
      const storedUser = await this.userRepository.findOne({
        where: {id: savedItem.user.id},
        select:['id','name']
      });
      if (!storedUser) {
        return Promise.reject(new AppError(AppErrorCode.SER02));
      }
      //Validate type name
      const storedItemType = await this.savedItemTypeRepository.findOne({
        where: { name: savedItem.savedItemType.name },
      });

      if (!storedItemType) {
        return Promise.reject(new AppError(AppErrorCode.SER02));
      }
      const assembleItem: SavedItem = Object.assign(new SavedItem(), {
        user_rating: savedItem.user_rating,
        third_party_url: savedItem.third_party_url,
        user: storedUser,
        savedItemType: storedItemType
      });
      return await this.savedItemRepository.save(assembleItem);
    } catch (e: any) {
      return Promise.reject(new AppError(AppErrorCode.SYS02));
    }
  }

  deleteSavedItem = async (itemId:number) => {
    try {
      //Validate saved item existence
      const storedSavedItem = await this.savedItemRepository.findOne({
        where: {id: itemId},
        relations: ['savedItemType'],
      });
      if (!storedSavedItem) {
        return Promise.reject(new AppError(AppErrorCode.SER02));
      }
      return await this.savedItemRepository.remove(storedSavedItem);
    } catch (e: any) {
      return Promise.reject(new AppError(AppErrorCode.SYS02));
    }
  }

  updateSavedItem = async (itemId:number, rating:number) => {
    try {
      //Validate saved item existence
      const storedSavedItem = await this.savedItemRepository.findOne({
        where: {id: itemId},
        relations: ['savedItemType'],
      });
      if (!storedSavedItem) {
        return Promise.reject(new AppError(AppErrorCode.SER02));
      }

      return await this.savedItemRepository.save({
        ...storedSavedItem,
        user_rating:rating
      });
    } catch (e: any) {
      return Promise.reject(new AppError(AppErrorCode.SYS02));
    }
  }

}
