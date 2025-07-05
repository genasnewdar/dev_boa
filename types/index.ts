export interface ICookies {
	[key: string]: string;
}

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
export type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never;

export type UrlPath = `/${string}` | `https://${string}`;

export type RequestOptions = {
	method?: string;
	headers?: Record<string, string>;
	body?: any;
	cookie?: string;
	params?: Record<string, string | number | boolean | undefined | null>;
	cache?: RequestCache;
	next?: NextFetchRequestConfig;
	authType?: | 'token' | 'unauthorized';
};

export interface ICourseCard {
	id: string;
	title: string;
	created_at: string;
	teacherName: string;
	teacherImage: string;
	description: string;
	coverImage: string;
	category: string;
	price: string;
	templateImageUrl: string;
}

export interface ILessonData {
	isPublic?: boolean;
	course_id: number;
	created_at: string;
	description: string;
	id: number;
	is_deleted: boolean;
	title: string;
	updated_at: string;
	videoUrl: string;
	price: number;
	duration: string | null;
	rating: number | null;
	rating_count: number | null;
	templateImageUrl: string | null;
	category?: string;
	teacherImage?: string;
	teacherName?: string;
	userType?: 'TEACHER' | 'STUDENT';
};

export interface ICourseLesson extends ILessonData {
	CourseQuestion: []
}


export interface ICourseData {
	created_at: string;
	description: string;
	id: number;
	is_deleted: boolean;
	lessons: ILessonData[];
	teacherId: number | null;
	title: string;
}


export interface ICollectiveCard extends ICourseCard { 
	isPublic?: boolean;
	userType?: 'TEACHER' | 'STUDENT';
};


export interface ILesson {
	id: number;
	title: string;
	description: string;
	videoUrl: string;
	course_id: number;
	templateImageUrl: string | null;
	created_at: string; 
	updated_at: string; 
	is_deleted: boolean;
};

export interface ICourse {
	id: number;
	teacherId: string;
	title: string;
	description: string;
	created_at: string;
	updated_at: string;
	is_deleted: boolean;
	lessons: ILesson[];
};