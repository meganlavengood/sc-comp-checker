import "./App.css";
import { useState } from "react";

// The to-do list item will have an ID number and a description of the thing to do (text string)
type PCset = number[];

interface inputNumbers {
	aw: number;
	ax: number;
	ay: number;
	az: number;
	bw: number;
	bx: number;
	by: number;
	bz: number;
	tna: number;
	ina1: number;
	ina2: number;
	tnb: number;
	inb1: number;
	inb2: number;
}

function App() {
	const [inputs, setInputs] = useState<inputNumbers>({
		aw: 0,
		ax: 0,
		ay: 0,
		az: 0,
		bw: 0,
		bx: 0,
		by: 0,
		bz: 0,
		tna: 0,
		ina1: 0,
		ina2: 0,
		tnb: 0,
		inb1: 0,
		inb2: 0,
	});

	const pcsetA: PCset = [inputs?.aw, inputs?.ax, inputs?.ay, inputs?.az];
	const pcsetB: PCset = [inputs?.bw, inputs?.bx, inputs?.by, inputs?.bz];

	function rotate(pcset: PCset, index: number) {
		// const spliced = pcset.splice(0, index);
		// console.log(spliced + "—spliced; " + pcset + " leftover");
		// pcset.push(...spliced);
		pcset.push(...pcset.splice(0, index)); // splice out the part of the set before the biggest interval; move that to the end, effectively rotating the array in place
		// console.log("rotated: " + pcset);
		return pcset;
	}

	function normalOrder(pcset: PCset) {
		pcset.sort((n1, n2) => n1 - n2); // sort numerically ascending
		// console.log(pcset + "—sorted **********");
		const compare = [...pcset.slice(1), pcset[0]]; // create a comparison array with the first number moved to the end
		// console.log(compare + "—comparison array");
		const intervals = compare.map((comparepc, i) => (comparepc - pcset[i] + 12) % 12); // using the comparison array as a proxy for the thing in position n+1, calculate the intervals between each adjacent pair of notes in pcset
		// console.log(intervals + "—intervals");
		// console.log("position of biggest int: " + intervals.indexOf(Math.max(...intervals)));
		rotate(pcset, intervals.indexOf(Math.max(...intervals)) + 1); // rotate the original set to begin at the index number of the highest interval

		return pcset;
	}

	function transpose(pcset: PCset, n: number) {
		const result = pcset.map((x) => (x + n) % 12);
		// console.log(result);
		return result;
	}

	function invert(pcset: PCset, n: number) {
		const result = pcset.map((x) => (n - x + 12) % 12);
		// console.log(result);
		return result;
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		setInputs((values) => ({ ...values, [name]: Number(value) }));
	};

	const randomFill = () => {
		const results: Partial<inputNumbers> = {};
		for (const key in inputs) {
			results[key as keyof inputNumbers] = Math.floor(Math.random() * 12);
		}
		setInputs(results as inputNumbers);
	};

	const handleSubmit: React.ComponentProps<"form">["onSubmit"] = (e) => {
		e.preventDefault();
	};

	return (
		<div className="app">
			<h1>SC Comp Prep Checker</h1>

			<form className="todo-form" onSubmit={handleSubmit}>
				<h2>Set A</h2>
				<div className="row">
					<div className="w-50">
						<p>Original</p>
						<input type="text" placeholder="x" name="aw" value={inputs.aw} onChange={handleChange} />
						<input type="text" placeholder="x" name="ax" value={inputs.ax} onChange={handleChange} />
						<input type="text" placeholder="x" name="ay" value={inputs.ay} onChange={handleChange} />
						<input type="text" placeholder="x" name="az" value={inputs.az} onChange={handleChange} />
						<p>Normal form: [{normalOrder(pcsetA).join(", ")}]</p>
					</div>
					<div className="w-50">
						<p>
							T
							<sub>
								<input type="text" placeholder="n" name="tna" value={inputs.tna} onChange={handleChange}></input>
							</sub>
							: [{transpose(pcsetA, inputs.tna).join(", ")}]
						</p>
						<p>
							I
							<sub>
								<input type="text" placeholder="n" name="ina1" value={inputs.ina1} onChange={handleChange}></input>
							</sub>
							: [{normalOrder(invert(pcsetA, inputs.ina1)).join(", ")}]
						</p>
						<p>
							I
							<sub>
								<input type="text" placeholder="n" name="ina2" value={inputs.ina2} onChange={handleChange}></input>
							</sub>
							: [{normalOrder(invert(pcsetA, inputs.ina2)).join(", ")}]
						</p>
					</div>
				</div>
				<hr />
				<h2>Set B</h2>
				<div className="row">
					<div className="w-50">
						<p>Original</p>
						<input type="text" placeholder="x" name="bw" value={inputs.bw} onChange={handleChange} />
						<input type="text" placeholder="x" name="bx" value={inputs.bx} onChange={handleChange} />
						<input type="text" placeholder="x" name="by" value={inputs.by} onChange={handleChange} />
						<input type="text" placeholder="x" name="bz" value={inputs.bz} onChange={handleChange} />
						<p>Normal form: [{normalOrder(pcsetB).join(", ")}]</p>
					</div>
					<div className="w-50">
						<p>
							T
							<sub>
								<input type="text" placeholder="n" name="tnb" value={inputs.tnb} onChange={handleChange}></input>
							</sub>
							: [{transpose(pcsetB, inputs.tnb).join(", ")}]
						</p>
						<p>
							I
							<sub>
								<input type="text" placeholder="n" name="inb1" value={inputs.inb1} onChange={handleChange}></input>
							</sub>
							: [{normalOrder(invert(pcsetB, inputs.inb1)).join(", ")}]
						</p>
						<p>
							I
							<sub>
								<input type="text" placeholder="n" name="inb2" value={inputs.inb2} onChange={handleChange}></input>
							</sub>
							: [{normalOrder(invert(pcsetB, inputs.inb2)).join(", ")}]
						</p>
					</div>
				</div>
				<div className="row">
					<button className="delete-btn" onClick={randomFill}>
						Fill with random ints
					</button>
				</div>
			</form>
		</div>
	);
}

export default App;
