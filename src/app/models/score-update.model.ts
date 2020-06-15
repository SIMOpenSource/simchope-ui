export class ScoreUpdate {
  constructor(
    public student: string,
    // tslint:disable-next-line:variable-name
    public study_area: number,
    public score: number
  ) {
  }

  static deriveClassNameAndText(score: number) {
    let className: string;
    let text: string;
    switch (score) {
      case 0:
        className = 'custom-green';
        text = 'Almost all of the spaces available';
        break;
      case 1:
        className = 'custom-yellow';
        text = 'Fewer than half of the spaces available';
        break;
      case 2:
        className = 'custom-orange';
        text = 'Half or more of the spaces available';
        break;
      case 3:
        className = 'custom-red';
        text = 'Almost all of the spaces occupied';
        break;
      default:
        throw new Error('Error deriving colour from score');
    }
    return {
      className,
      text
    };
  }
}
