import Interview from "../models/interviewModel.js";

export const analytics = async (req, res) => {
  try {
    const interviews = await Interview.find({
      userId: req.user._id,
      status: "Completed",
    });

    const totalInterviews = interviews.length;

    const highestScore =
     totalInterviews === 0
    ? 0
    :  Math.max(...interviews.map((i) => i.finalScore));

    const avgScore =
    totalInterviews === 0
    ? 0
    :interviews.reduce((sum, i) => sum + i.finalScore) / totalInterviews;

    let confidence = 0;
    let communication = 0;
    let correctness = 0;
    let totalQuestions = 0;

    interviews.forEach((interview) => {
      interview.questions.forEach((q) => {
        confidence += q.confidence;
        communication += q.communication;
        correctness += q.correctness;

        totalQuestions++;
      });
    });
    confidence =
        totalQuestions === 0 ? 0 : confidence / totalQuestions;

    communication =
        totalQuestions === 0 ? 0 : communication / totalQuestions;

    correctness =
        totalQuestions === 0 ? 0 : correctness / totalQuestions;

    const recentInterviews = interviews
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    const performanceGraph = interviews.map((interview, index) => ({
        interview: index + 1,
        score: interview.finalScore,
    }));

    return res.status(200).json({
    totalInterviews,
    highestScore,
    avgScore,
    confidence,
    communication,
    correctness,
    performanceGraph,
    recentInterviews,
    });
  } catch (error) {
    console.log(error);
  }
};

