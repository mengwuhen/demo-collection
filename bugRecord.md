### echarts 使用地图，format 显示的值 为NaN
* 原因 传给data 的数组 name 属性的值 可能包含 **省** 字,正确的格式应该不包含。
### git develop 分支 合并到 master 是 产生 覆盖的情况

* 有时候 develop的 代码 和 master 分支的代码 存在差异。 但是又想保持这种差异 。因为某些原因，每次 develop 合并至 master 分支时会产生覆盖。  原因是因为 develop 的版本 领先于 master的 版本 因此在合并时 会产生 覆盖。解决办法 是在初次合并时保证 master的 版本领先于 develop 的 版本，这样在后续的 合并中 就会产生冲突，可以手动选择保留当前 版本。

###