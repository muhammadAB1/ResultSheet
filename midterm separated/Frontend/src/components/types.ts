export type Student = {
	_id: string;
	regno: string;
	name: string;
	marks: Mark[];
};

export type Head = {
	_id: string;
	hid: number;
	headname: string;
	total: number;
};

export type Mark = {
	_id: string;
	mid: number;
	regno: string;
	hid: number;
	marks: number | string;
	head: Head;
	status?: number;
};

export type Grade = {
	_id: string;
	gradeid: number;
	start: number;
	end: number;
	grade: string;
	gpa: number;
};

export type MarksFormProps = {
	student: Student;
	grades: Grade[];
	updateMarks: (mark: Mark) => void;
	closeForm: () => void;
};
