/**value
 * 模拟数据
 */

export let responseData = {
  rows: [
    {
      key: "CAN",
      name: "总线",
      value: "can1",
      format: "string",
    },
    {
      key: "num",
      name: "数量",
      value: 1,
      format: "number",
    },
    {
      key: "io",
      name: "IO",
      format: "array",
      childs: [
        {
          format: "object",
          childs: [
            {
              key: "test1",
              name: "测试1",
              value: 1,
              format: "number",
            },
            {
              key: "test2",
              name: "测试2",
              value: 2,
              format: "number",
            },
          ],
        },
        {
          format: "object",
          childs: [
            {
              key: "test1",
              name: "测试1",
              value: 1,
              format: "number",
            },
            {
              key: "test2",
              name: "测试2",
              value: 2,
              format: "number",
            },
          ],
        },
      ],
    },
    {
      key: "iotwo",
      name: "IO2",
      format: "array",
      childs: [
        {
          format: "array",
          childs: [
            {
              format: "number",
              value: 2,
            },
            {
              format: "number",
              value: 2,
            },
            {
              format: "number",
              value: 2,
            },
          ],
        },
        {
          format: "array",
          childs: [
            {
              format: "number",
              value: 2,
            },
            {
              format: "number",
              value: 2,
            },
            {
              format: "number",
              value: 2,
            },
          ],
        },
      ],
    },
    {
      key: "wheelS",
      name: "轮舵",
      format: "object",
      childs: [
        {
          key: "wheel",
          name: "轮",
          value: 2,
          format: "number",
        },
        {
          key: "steer",
          name: "舵",
          value: 2,
          format: "number",
        },
      ],
    },
  ],
};
