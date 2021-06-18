import { IEmoji } from '../utils/emojis';

export interface IFeedbackProps {
  title: string;
  emoji: IEmoji;
  info: string;
  buttonTitle: string;
  routeName: string;
}
