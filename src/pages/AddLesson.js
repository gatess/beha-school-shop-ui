import React , {useState, useEffect} from "react";
import { Form, Input, message , Select , Card , Spin , Button } from "antd";
import {UserOutlined  , LoadingOutlined, LeftCircleFilled } from '@ant-design/icons';
import {  useHistory} from "react-router-dom";
import LessonTable from "../components/schoolAdmin/LessonTable";
const FormItem = Form.Item;
const { Option } = Select;
const AddLesson = () => {
    const [form] = Form.useForm();
    let schoolAdminResult = JSON.parse(localStorage.getItem("schoolAdminResult"));
    let schoolId = JSON.parse(localStorage.getItem("schoolId"));
    const [lessons,setLessons] = useState([]);
    const [teachers,setTeachers] = useState([]);
    const [teacherId,setTeacherId] = useState();
    const [spinActiveTable,setSpinActiveTable]=useState(false);

    useEffect(() => {
      let schoolAdminResult = JSON.parse(localStorage.getItem('schoolAdminResult')); 
      if(!schoolAdminResult) {
          history.push({
            pathname: '/schooladmin'
          })
      }
    }, []);

    console.log(schoolId);
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      };

      useEffect(() => {
        debugger;
        console.log(lessons);
        let lessonData = schoolAdminResult ? schoolAdminResult.gradeLessonDto : [];

        setLessons(lessonData);
        let teachers = schoolAdminResult ? (schoolAdminResult.teacherDto.map((teacher, index) => 
          <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>)) : [];
          setTeachers(teachers);

    }, []);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [spinActive , setSpinActive] = useState(false);
    const history = useHistory();

    const onTeacherChange = teacherId => {
      debugger;
      setTeacherId(teacherId);
    }

    const handleSubmit = (value) => {
        debugger;
        value["schoolId"]=schoolId;
    setSpinActive(true); 
    fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/school-admin/add-lesson/",{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
  } )
      .then(res => res.json())
      .then(
        (result) => {
          form.resetFields();
          setSpinActive(false);
          debugger;
          console.log(result);
          if(result.status === 's'){
              debugger;
              message.success('Ders başarıyla eklendi.');
              let tempLessons = lessons;
              let lessonToAdd = {
                gradeName: result.gradeLessonDTO.gradeName,
                lessonName: result.gradeLessonDTO.lessonName,
                lessonId: result.gradeLessonDTO.lessonId,
                gradeId:result.gradeLessonDTO.gradeId,
                teacherId:result.gradeLessonDTO.teacherId,
                teacherName:result.gradeLessonDTO.teacherName
              };
              tempLessons=[...tempLessons,lessonToAdd];
              setLessons(tempLessons);
              schoolAdminResult.gradeLessonDto=tempLessons;
              localStorage.setItem('schoolAdminResult',JSON.stringify(schoolAdminResult));
              console.log(lessons);
          }else{
            message.error(result.message);
          }
        },
        (error) => {
          setSpinActive(false);
          console.log(error);
        }
      );  
    };

    const onDeleteLesson = (lessonId) => {
      setSpinActiveTable(true);
      fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/school-admin/deleteLesson/" + lessonId)
          .then(res => res.json())
          .then(
              (result) => {
                if(result.status === 's'){
                  setSpinActiveTable(false);
                  debugger;
                  let tempLessons = lessons.filter(item => item.lessonId !== lessonId);
                  console.log(tempLessons);
                  setLessons(tempLessons);
                  schoolAdminResult.gradeLessonDto=tempLessons;
                  localStorage.setItem('schoolAdminResult',JSON.stringify(schoolAdminResult));
                  console.log(lessons); }
                else{
                  setSpinActiveTable(false);
                  message.error(result.message);
                }
                },
              (error) => {
                setSpinActiveTable(false);
                  console.log(error);
              }
          );

    }

    const updateTeacher = (teacherId,lessonId) => {
      let request = { lessonId: lessonId, teacherId: teacherId };
      setSpinActiveTable(true); 
      fetch("http://beha-schoolshop.eu-central-1.elasticbeanstalk.com/school-admin/update-teacher/",{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
  } )
      .then(res => res.json())
      .then(
        (result) => {
          setSpinActiveTable(false); 
          debugger;
          console.log(result);
          if(result.status === 's'){
              debugger;
              message.success('Ders/Öğretmen başarıyla güncellendi.');
              let tempLessons = lessons;
              tempLessons.forEach(lesson => {
                 if (lesson.lessonId==lessonId) {
                    lesson.teacherName=result.teacherName;
                    lesson.teacherId=result.teacherId;
                  }
            });

              setLessons(tempLessons);
              schoolAdminResult.gradeLessonDto=tempLessons;
              localStorage.setItem('schoolAdminResult',JSON.stringify(schoolAdminResult));
              console.log(lessons);
          }else{
            message.error(result.message);
          }
        },
        (error) => {
          setSpinActiveTable(false);
          console.log(error);
        }
      );  
    }

    return (
        <div>
       <Card title="Ders / Sınıf Ekle" style={{ marginRight:"auto", marginLeft:"auto", float:"center" , width: 400}}>
                <Spin indicator={antIcon} spinning={spinActive} >
                <Form onFinish={handleSubmit} form={form} className="gx-login-form gx-form-row0" {...formItemLayout}>
                    <FormItem label="Sınıf Adı" name="gradeName" rules={[{ required: true, message: 'Lütfen Sınıf Adını Giriniz!' }]}>
                        <Input/>
                    </FormItem>
                    <FormItem label="Ders Adı" name="lessonName" rules={[{ required: true, message: 'Lütfen Ders Adını Giriniz!' }]}>
                        <Input/>
                    </FormItem>
                    <FormItem name="teacherId" label="Öğretmen" rules={[{ required: true, message: 'Lütfen Öğretmen Seçiniz!' }]}>
                     <Select placeholder="Lütfen Öğretmen seciniz" onChange={onTeacherChange} allowClear>
                      {teachers}
                     </Select>
                    </FormItem>
                    <FormItem style={{float:"right"}}>
                        <Button type="primary" htmlType="submit">
                           Ekle
            </Button>
                    </FormItem>
                </Form>
                </Spin></Card>
                <Spin indicator={antIcon} spinning={spinActiveTable} >
           <LessonTable updateTeacher={updateTeacher} deleteLesson={onDeleteLesson} teacher={teachers} grade={lessons} ></LessonTable>
           </Spin>
           </div>
    );
}

export default AddLesson;
