var arr = [23,34,3,4,25,44,333,333,444];
		

// 冒泡
// for (let i=0; i< arr.length-1; i++) {
// 	for(let j=arr.length - 1; j > i; j--){
// 		if(arr[j-1]>arr[j]){
// 			var temp = arr[j-1]
// 			arr[j-1] = arr[j]
// 			arr[j] = temp
// 		}
// 	}
// }


// 选择
// for (var i=0; i < arr.length - 1; i++) {
// 	var min = arr[i]
// 	for(var j = i+1; j<arr.length; j++) {
// 		if(min>arr[j]) {
// 			var temp = min,
// 			min = arr[j]
// 			arr[j] = temp
// 		}
// 	}
// 	arr[i] = min
// } 


// 快排
// var quickSort = function(arr) {
//     if(arr.length < 1) {//如果数组就是一项，那么可以直接返回
//         return arr;
//     }
//     var centerIndex = Math.floor(arr.length / 2);//获取数组中间的索引
// //     var centerValue = arr[centerIndex];//获取数组中间项
// 	var centerValue = arr.splice(centerIndex, 1);
// 	console.log(centerValue)
//     var left = [], right = [];
//     for(var i = 0; i < arr.length; i++){
//         if(arr[i] < centerValue){
//             left.push(arr[i]);
//         }else{
//             right.push(arr[i]);
//         }
//     }
//     return quickSort(left).concat(centerValue, quickSort(right));//递归调用
// }
function quicksort(arr) {
	if(arr.length < 1) {
		return arr
	}
	var centerIndex = Math.floor(arr.length/2)
	var centerValue = arr.splice(centerValue,1)
	var left = [], right = []
	for(var i = 0; i< arr.length;i ++) {
		if(arr[i]<centerValue) {
			left.push(arr[i])
		}else {
			right.push(arr[i])
		}
	}
	return quicksort(left).concat(centerValue, quicksort(right))
}

console.log(quicksort(arr))
console.log(arr)






