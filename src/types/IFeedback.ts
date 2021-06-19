import { IEmoji } from '../utils/emojis';

export interface IFeedbackDataParams {
  title: string;
  emoji: IEmoji;
  info: string;
  buttonTitle: string;
  routeName: string;
}
