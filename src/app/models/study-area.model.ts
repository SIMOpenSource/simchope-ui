export class StudyArea {
  constructor(
    public id: number,
    public areaName: string,
    public block: string,
    public level: number,
    public scores: number[],
    public tableCount: number,
    public capacity: number,
    public facilities: string[],
    public description: string,
    public lastUpdated: Date
  ) { }

  static convertDTO(input: any): StudyArea {
    return new StudyArea(
      input.id, input.area_name, input.block, input.level, input.scores, input.table_count,
      input.capacity, input.facilities, input.description, input.last_updated
    );
  }
}
