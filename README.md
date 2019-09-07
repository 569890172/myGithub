##Redux 是javaScript状态管理容器，提供可预测化得状态管理。
Action 描述发生什么的对象
reducer 形式为(state,action)=> state 的纯函数，根据action 修改state 将其转换成下一个state
store 用于存储state,可以看成一个容器，整个应用只有一个 store