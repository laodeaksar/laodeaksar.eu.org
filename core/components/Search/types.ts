export type Result = {
  type: 'snippet' | 'blog';
  slug: string;
  title: string;
};

export interface Props {
  onClose: () => void;
}
