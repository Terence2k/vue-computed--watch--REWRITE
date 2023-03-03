<template>
	<div>
		<h1>答卷</h1>
		<p>
			<button @click="nextQuestion" v-show="index < 5 && index !== 4">下一题</button>

			<!-- <button @click="getQuestion" v-if="index == 0">获取试题</button> -->
		</p>
		<div class="wrapper" v-if="arr.length > 0">
			<div v-for="(q, index) in arr" :key="q.id">
				<span>问题 {{ index + 1 }}： {{ q.question }}</span>
				<p>
					<button v-for="(a, i) in q.items" :key="a" @click="answer(q.id, i)">
						{{ a }}
						&nbsp; &nbsp;
					</button>
				</p>
			</div>
		</div>
		<div v-else>待获取……</div>

		<div v-if="index == 4">
			<h2>结果</h2>

			<div style="background-color: orange;" v-for="(item, index) in answerList" :key="item.qid">
				<h5></h5>
				<p>题目：{{ index + 1 }} {{ item.question }}</p>
				<p>正确答案{{ item.rightAnswer }}</p>
				<p>你的答案{{ item.myAnswer }}</p>
				<p>{{ item.isRight ? "对" : "错" }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "vue"
import qs from "qs"

export default {
	data: function () {
		return {
			arr: [],
			index: -1,
			answerList: [],
		}
	},
	methods: {
		getQuestion() {
			axios.post(
				"http://localhost:8888/getQuestion",
				qs.stringify({
					order: this.index,
				}),
			).then((res) => {
				console.log(res)
				this.arr.push(res.data)
			})
		},
		answer(id, value) {
			axios.post(
				"http://localhost:8888/uploadAnswer",
				qs.stringify({
					order: id,
					myAnswer: value,
				}),
			).then((res) => {
				console.log(res, this.arr[id])
				this.answerList.push(res.data)
			})
		},
		nextQuestion() {
			this.index++
		},
	},
	watch: {
		index(newValue, oldValue) {
			if (newValue < 5) {
				this.getQuestion()
			}
		},
	},
}
</script>

<style>
/* .reques-wrapper {
	background-color: orange;
} */
</style>
