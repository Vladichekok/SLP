// Enum definitions
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}

enum Semester {
    First = "First",
    Second = "Second"
}

enum Grade {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}

// Interface definitions
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface GradeRecord {
    studentId: number;
    courseId: number;
    grade: Grade;
    date: Date;
    semester: Semester;
}

// UniversityManagementSystem class implementation
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: GradeRecord[] = [];
    private studentCounter = 1;
    private courseRegistrations: Map<number, Set<number>> = new Map();

    // Enroll a new student
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentCounter++, ...student };
        this.students.push(newStudent);
        this.courseRegistrations.set(newStudent.id, new Set());
        return newStudent;
    }

    // Register a student for a course
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student || !course) {
            throw new Error("Student or Course not found");
        }
        if (course.faculty !== student.faculty) {
            throw new Error("Course faculty does not match student's faculty");
        }
        const registeredStudents = Array.from(this.courseRegistrations.values())
            .filter(set => set.has(courseId)).length;
        if (registeredStudents >= course.maxStudents) {
            throw new Error("Course is full");
        }

        this.courseRegistrations.get(studentId)!.add(courseId);
    }

    // Set a grade for a student
    setGrade(studentId: number, courseId: number, grade: Grade): void {
        if (!this.courseRegistrations.get(studentId)?.has(courseId)) {
            throw new Error("Student is not registered for this course");
        }

        const course = this.courses.find(c => c.id === courseId)!;
        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: course.semester
        });
    }

    // Update student status
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error("Student not found");
        }
        if (student.status === StudentStatus.Graduated && newStatus !== StudentStatus.Graduated) {
            throw new Error("Graduated students cannot change status");
        }

        student.status = newStatus;
    }

    // Get students by faculty
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Get grades for a student
    getStudentGrades(studentId: number): GradeRecord[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Get available courses for a faculty and semester
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Calculate average grade for a student
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId).map(g => g.grade);
        if (studentGrades.length === 0) return 0;

        const sum = studentGrades.reduce((a, b) => a + b, 0);
        return sum / studentGrades.length;
    }

    // Get list of excellent students by faculty
    getExcellentStudentsByFaculty(faculty: Faculty): Student[] {
        const excellentStudentIds = new Set(
            this.grades.filter(g => g.grade === Grade.Excellent).map(g => g.studentId)
        );
        return this.students.filter(s => s.faculty === faculty && excellentStudentIds.has(s.id));
    }
}
