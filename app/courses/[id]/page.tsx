export default function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <>
      <p>Course {id}</p>
    </>
  );
}
