import Mock from "mockjs";
function test() {
  return [
    {
      ProcessName: "一周交易排行1",
      ClassName: "Java1",
      GroupName: "组1",
      Cronexpr: "dadadsa-dsads",
      ScheduleDesc: "这是调度说明",
      RuntimeState: "1",
      IsValId: "1"
    },
    {
      ProcessName: "一周交易排行2",
      ClassName: "Java1",
      GroupName: "组1",
      Cronexpr: "dadadsa-dsads",
      ScheduleDesc: "这是调度说明",
      RuntimeState: "0",
      IsValId: "1"
    },
    {
      ProcessName: "一周交易排行3",
      ClassName: "Java1",
      GroupName: "组1",
      Cronexpr: "dadadsa-dsads",
      ScheduleDesc: "这是调度说明",
      RuntimeState: "1",
      IsValId: "1"
    },
    {
      ProcessName: "一周交易排行4",
      ClassName: "Java1",
      GroupName: "组1",
      Cronexpr: "dadadsa-dsads",
      ScheduleDesc: "这是调度说明",
      RuntimeState: "1",
      IsValId: "1"
    },
    {
      ProcessName: "一周交易排行5",
      ClassName: "Java1",
      GroupName: "组1",
      Cronexpr: "dadadsa-dsads",
      ScheduleDesc: "这是调度说明",
      RuntimeState: "1",
      IsValId: "0"
    },
    {
      ProcessName: "一周交易排行6",
      ClassName: "Java1",
      GroupName: "组1",
      Cronexpr: "dadadsa-dsads",
      ScheduleDesc: "这是调度说明",
      RuntimeState: "1",
      IsValId: "0"
    },
    {
      ProcessName: "一周交易排行7",
      ClassName: "Java1",
      GroupName: "组1",
      Cronexpr: "dadadsa-dsads",
      ScheduleDesc: "这是调度说明",
      RuntimeState: "1",
      IsValId: "1"
    },
    {
      ProcessName: "一周交易排行8",
      ClassName: "Java1",
      GroupName: "组1",
      Cronexpr: "dadadsa-dsads",
      ScheduleDesc: "这是调度说明",
      RuntimeState: "1",
      IsValId: "0"
    }
  ];
}

// function getTotal(){
//   return 12131;
// }

Mock.mock(/\/test/, "post", test);
//Mock.mock(/\/getTotal/, 'get', getTotal);

export default Mock;
